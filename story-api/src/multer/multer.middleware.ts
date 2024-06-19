import { NextFunction, Request, Response } from 'express'

import { uploader } from './multer.config'
import { envVariables } from '../dotenv'

export class MulterMiddleware {

    static storyMulterMiddleware = (req: Request, res: Response, next: NextFunction) => {
        uploader(String(envVariables.UPLOAD_STORY_COVER_IMAGE_URL)).single('coverImage')(req, res, err => {
            if (err) {
                return next(err)
            }
            return next()
        }) 
    }

    static chapterImagesMulterMiddleware = (req: Request, res: Response, next: NextFunction) => {
        uploader(String(envVariables.UPLOAD_STORY_CHAPTER_URL)).array('chapterImage')(req, res, err => {
            if (err) {
                return next(err)
            }
            return next()
        }) 
    }
}