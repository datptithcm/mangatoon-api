import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import randomString from 'randomstring'

import { ResendVerifyingAccountCodeRequestDTO } from './dtos/resendVerifyingAccountCodeRequest.dto'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { MailPublisher } from '../../amqp/publisher/mailPublisher.class'
import { envVariables } from '../../dotenv'
import OtpContent from '../../mail/content/otp'
import { AppResponse } from '../../helpers/response.helper'
import { OtpService } from './otp.service'
import { sendCodeToVerifyAccountDTO } from '../../amqp/dtos/sendCodeToVerìyAccountReqFromAmqp.dto'

export class OtpController {

    static resendVerifyingAccountCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resendVerifyingAccountCodeRequestData = plainToClass(ResendVerifyingAccountCodeRequestDTO, req.body)

            const isActivatedAccount = await OtpService.isActivatedAccount(resendVerifyingAccountCodeRequestData.id)
            
            if (!isActivatedAccount) {
                const otpCode = randomString.generate({
                    length: 6,
                    charset: 'numeric'
                })
                await redisClient.setEx(RedisKeyGenerator.verifyingAccountCode(resendVerifyingAccountCodeRequestData.id), 5*60, otpCode)
                const mailPublisher = await MailPublisher.getInstance()
                await mailPublisher.sendCodeToVerifyAccount(plainToClass(sendCodeToVerifyAccountDTO, {
                    from: envVariables.MAILER_HOST,
                    to: resendVerifyingAccountCodeRequestData.email,
                    subject: 'Verify Account',
                    html: await OtpContent(otpCode)
                }))

                return res.send(new AppResponse(true, null))
            }
            
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

}