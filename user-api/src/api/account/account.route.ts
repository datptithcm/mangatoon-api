import { Router } from 'express'

import { AccountValidation } from './account.validation'
import { AccountController } from './account.controller'

export const AccountRouter = Router()

AccountRouter.put('/verifyAccount', AccountValidation.verifyAccount, AccountController.verifyAccount)