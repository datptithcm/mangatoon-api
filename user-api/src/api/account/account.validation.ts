import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { Errors } from '../../helpers/error.helper'
import { VerifyAccountRequestDTO } from './dtos/verifyAccountRequest.dto'

export class AccountValidation {

    static verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyAccountRequestData = plainToClass(VerifyAccountRequestDTO, req.body)
            await validateOrReject(verifyAccountRequestData)
            return next()
        } catch (error) {
            return next(Errors.BadRequest)
        }
    }

}