import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

import { VerifyAccountRequestDTO } from './dtos/verifyAccountRequest.dto'
import { redisClient } from '../../redis/redis.config'
import { RedisKeyGenerator } from '../../helpers/redisKey.helper'
import { AccountService } from './account.service'
import { UpdateAccountDTO } from './dtos/updateAccount.dto'
import { AccountStatus } from '../../enums/account.enum'
import { AppResponse } from '../../helpers/response.helper'
import { handler } from '../../helpers/error.helper'

export class AccountController {

    static verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyAccountRequestData = plainToClass(VerifyAccountRequestDTO, req.body)
            const verifyingAccountCodeInRedis = await redisClient.get(RedisKeyGenerator.verifyingAccountCode(verifyAccountRequestData.id))
            if (verifyAccountRequestData.otpCode === verifyingAccountCodeInRedis) {
                const affectedCount = await AccountService.updateAccount(verifyAccountRequestData.id, plainToClass(UpdateAccountDTO, {
                    status: AccountStatus.ACTIVATED
                }))
                handler(async () => {
                    await redisClient.del(RedisKeyGenerator.verifyingAccountCode(verifyAccountRequestData.id))
                })
                if (affectedCount[0] > 0) {
                    return res.send(new AppResponse(true, null))
                }
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

}