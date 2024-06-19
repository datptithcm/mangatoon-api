import { Router } from 'express'

import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'

export const AuthRouter = Router()

AuthRouter.post('/signUp/emailPassword', AuthValidation.signUpWithEmailPassword, AuthController.signUpWithEmailPassword)
AuthRouter.post('/signIn/emailPassword', AuthValidation.signInWithEmailPassword, AuthController.signInWithEmailPassword)
AuthRouter.post('/signOut', AuthValidation.signOut, AuthController.signOut)
AuthRouter.post('/refreshToken', JwtMiddleware.verifyRefreshToken, AuthValidation.refreshToken, AuthController.refreshToken)