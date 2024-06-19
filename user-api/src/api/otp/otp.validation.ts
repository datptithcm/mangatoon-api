import { NextFunction, Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Errors } from '../../helpers/error.helper'
import { ResendVerifyingAccountCodeRequestDTO } from './dtos/resendVerifyingAccountCodeRequest.dto'

export class OtpValidation {

    static resendOtpCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resendOtpCodeRequestData = plainToClass(ResendVerifyingAccountCodeRequestDTO, req.body)
            await validateOrReject(resendOtpCodeRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}