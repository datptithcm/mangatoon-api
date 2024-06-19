import { Router } from 'express'

import { StoryFollowDetailValidation } from './storyFollowDetail.validation'
import { StoryFollowDetailController } from './storyFollowDetail.controller'
import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { StoryFollowDetailAuthorization } from './storyFollowDetail.authorization'

export const StoryFollowDetailRouter = Router()

StoryFollowDetailRouter.post('/', StoryFollowDetailValidation.createStoryFollowDetail, JwtMiddleware.authentication, StoryFollowDetailAuthorization.createStoryFollowDetail, StoryFollowDetailController.createStoryFollowDetail)
StoryFollowDetailRouter.delete('/', StoryFollowDetailValidation.deleteStoryFollowDetail, JwtMiddleware.authentication, StoryFollowDetailAuthorization.deleteStoryFollowDetail, StoryFollowDetailController.deleteStoryFollowDetail)
StoryFollowDetailRouter.get('/', StoryFollowDetailValidation.getStoryFollowDetail, StoryFollowDetailController.getStoryFollowDetail)
StoryFollowDetailRouter.get('/story/:storyId/followCount', StoryFollowDetailValidation.getFollowCountOfStory, StoryFollowDetailController.getFollowCountOfStory)
StoryFollowDetailRouter.get('/story/topFollowCount', StoryFollowDetailValidation.getTopStoriesByFollowCount, StoryFollowDetailController.getTopStoriesByFollowCount)