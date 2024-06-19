import express, { Router } from 'express'

import { AuthRouter } from '../api/auth/auth.route'
import { AccountRouter } from '../api/account/account.route'
import { OtpRouter } from '../api/otp/otp.route'

export const AppRouter = Router()

AppRouter.use('/uploads', express.static('uploads'))
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/account', AccountRouter)
AppRouter.use('/otp', OtpRouter)