import { Router } from 'express'

import { StoryValidation } from './story.validation'
import { MulterMiddleware } from '../../multer/multer.middleware'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryAuthorization } from './story.authorization'
import { StoryController } from './story.controller'

export const StoryRouter = Router()

StoryRouter.post('/', JwtMiddleware.authentication, StoryAuthorization.createStory, MulterMiddleware.storyMulterMiddleware, StoryValidation.createStory, StoryController.createStory)
StoryRouter.post('/:id', JwtMiddleware.authentication, StoryAuthorization.updateStory, MulterMiddleware.storyMulterMiddleware, StoryValidation.updateStory, StoryController.updateStory)
StoryRouter.get('/', StoryValidation.getStories, StoryController.getStories)
StoryRouter.get('/search', StoryValidation.searchStories, StoryController.searchStories)