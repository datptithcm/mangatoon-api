import { NextFunction, Request, Response } from 'express'

import { uploader } from './multer.config'
import { envVariables } from '../dotenv'

export class MulterMiddleware {

    static storyMulterMiddleware = (req: Request, res: Response, next: NextFunction) => {
        uploader(String(envVariables.UPLOAD_AVATAR_URL)).single('avatar')(req, res, err => {
            if (err) {
                return next(err)
            }
            return next()
        }) 
    }

}