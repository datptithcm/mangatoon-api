import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import moment from 'moment'
import { randomUUID } from 'crypto'
import randomString from 'randomstring'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SignUpWithEmailPasswordRequestDTO } from './dtos/signUpWithEmailPasswordRequest.dto'
import { sequelize } from '../../database/mysql.config'
import { AuthService } from './auth.service'
import { UserDTO } from './dtos/user.dto'
import { AccountDTO } from './dtos/account.dto'
import { EmailPasswordCredentialDTO } from './dtos/emailPasswordCredential.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { AppResponse } from '../../helpers/response.helper'
import { MailPublisher } from '../../amqp/publisher/mailPublisher.class'
import { envVariables } from '../../dotenv'
import OtpContent from '../../mail/content/otp'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { SignInWithEmailPasswordRequestDTO } from './dtos/signInWithEmailPasswordRequest.dto'
import { TokenHelper, TokenPair } from '../../helpers/token'
import { Payload } from '../../jwt/jwt.type'
import { UserPublisher } from '../../amqp/publisher/userPublisher.class'
import { AccountStatus } from '../../enums/account.enum'
import { SignOutRequestDTO } from './dtos/signOutRequest.dto'
import { sendCodeToVerifyAccountDTO } from '../../amqp/dtos/sendCodeToVerìyAccountReqFromAmqp.dto'
import { CreateUserReqFromAmqpDTO } from '../../amqp/dtos/createUserReqFromAmqp.dto'
import { RefreshTokenReqDTO } from './dtos/refreshTokenReq.dto'
import { RefreshTokenReqFromAmqp } from '../../amqp/dtos/refreshTokenReqFromAmqp.dto'

export class AuthController {

    static signUpWithEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()

        try {
            const signUpWithEmailPasswordRequestData = plainToClass(SignUpWithEmailPasswordRequestDTO, req.body, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })

            const user = await AuthService.createUser(plainToClass(UserDTO, {
                name: `user-${randomUUID().toString().replaceAll('-', '')}`
            } as UserDTO), transaction)

            const account = await AuthService.createAccount(plainToClass(AccountDTO, {
                createdAt: moment().format('YYYY-MM-DD'),
                userId: user.id
            } as AccountDTO), transaction)

            await AuthService.createEmailPasswordCredential(plainToClass(EmailPasswordCredentialDTO, {
                id: account.id,
                ...signUpWithEmailPasswordRequestData
            } as EmailPasswordCredentialDTO), transaction)

            const otpCode = randomString.generate({
                length: 6,
                charset: 'numeric'
            })
            await redisClient.setEx(RedisKeyGenerator.verifyingAccountCode(account.id), 5 * 60, otpCode)
            const mailPublisher = await MailPublisher.getInstance()
            await mailPublisher.sendCodeToVerifyAccount(plainToClass(sendCodeToVerifyAccountDTO, {
                from: envVariables.MAILER_HOST,
                to: signUpWithEmailPasswordRequestData.email,
                subject: 'Verify Account',
                html: await OtpContent(otpCode)
            } as sendCodeToVerifyAccountDTO))

            const userPublisher = await UserPublisher.getInstance()
            await userPublisher.signUp(plainToClass(CreateUserReqFromAmqpDTO, {
                id: user.id
            } as CreateUserReqFromAmqpDTO))

            await transaction.commit()
            return res.send(new AppResponse({
                ...account.dataValues,
                id: account.id
            }, null))
        } catch (error) {
            await transaction.rollback()
            return next(error)
        }
    }

    static signInWithEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signInWithEmailPasswordRequestData = plainToClass(SignInWithEmailPasswordRequestDTO, req.body)

            const emailPasswordCredential = await AuthService.getEmailPasswordCredentialByEmail(signInWithEmailPasswordRequestData.email)
            if (emailPasswordCredential) {
                if (bcrypt.compareSync(signInWithEmailPasswordRequestData.password, emailPasswordCredential.dataValues.password)) {
                    const account = await AuthService.getAccountById(emailPasswordCredential.dataValues.id)
                    if (account?.dataValues.status === AccountStatus.ACTIVATED) {
                        const tokenPair = TokenHelper.createTokenPair(plainToClass(Payload, {
                            userId: account.dataValues.userId,
                            status: account.dataValues.status,
                            role: account.dataValues.role,
                            iat: Date.now()
                        } as Payload))

                        await redisClient.multi()
                            .setEx(RedisKeyGenerator.accessTokenkey(tokenPair.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), tokenPair.accessToken)
                            .setEx(RedisKeyGenerator.refreshTokenkey(tokenPair.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), tokenPair.refreshToken)
                            .exec()

                        const userPublisher = await UserPublisher.getInstance()
                        await userPublisher.signIn(tokenPair)
                        return res.send(new AppResponse({
                            token: tokenPair,
                            account: account
                        }, null))
                    } else {
                        return res.send(new AppResponse({
                            token: null,
                            account
                        }, null))
                    }
                }
            }

            return res.send(new AppResponse({
                token: null,
                account: null
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static signInWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (error) {
            return next(error)
        }
    }

    static signInWithFacebook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (error) {
            return next(error)
        }
    }

    static signOut = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signOutRequestData = plainToClass(SignOutRequestDTO, req.body)
            await redisClient.multi()
                .del(RedisKeyGenerator.accessTokenkey(signOutRequestData.accessToken))
                .del(RedisKeyGenerator.refreshTokenkey(signOutRequestData.refreshToken))
                .exec()
            const userPublisher = await UserPublisher.getInstance()
            await userPublisher.signOut(plainToClass(TokenPair, signOutRequestData))
            return res.send(new AppResponse(true, null))
        } catch (error) {
            return next(error)
        }
    }

    static refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshTokenReqData = plainToClass(RefreshTokenReqDTO, req.body)

            const payload = jwt.decode(refreshTokenReqData.refreshToken) as Payload
            const newTokens = TokenHelper.createTokenPair({
                ...payload,
                iat: Date.now()
            })
            await redisClient.multi()
                .del(RedisKeyGenerator.accessTokenkey(refreshTokenReqData.accessToken))
                .del(RedisKeyGenerator.refreshTokenkey(refreshTokenReqData.refreshToken))
                .setEx(RedisKeyGenerator.accessTokenkey(newTokens.accessToken), Number(envVariables.REDIS_ACCESS_TOKEN_TTL), newTokens.accessToken)
                .setEx(RedisKeyGenerator.refreshTokenkey(newTokens.refreshToken), Number(envVariables.REDIS_REFRESH_TOKEN_TTL), newTokens.refreshToken)
                .exec()

            const userPublisher = await UserPublisher.getInstance()
            userPublisher.refreshToken(plainToClass(RefreshTokenReqFromAmqp, {
                oldAccessToken: refreshTokenReqData.accessToken,
                newAccessToken: newTokens.accessToken
            } as RefreshTokenReqFromAmqp))
            return res.send(new AppResponse(newTokens, null))
        } catch (error) {
            return next(error)
        }
    }

}