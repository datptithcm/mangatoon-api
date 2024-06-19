import { Router } from 'express'

import { JwtMiddleware } from '../../jwt/jwt.middleware'
import { CommentInteractionAuthorization } from './commentInteraction.authorization'
import { CommentInteractionValidation } from './commentInteraction.validation'
import { CommentInteractionController } from './commentInteraction.controller'

export const CommentInteractionRouter = Router()

CommentInteractionRouter.post('/', JwtMiddleware.authentication, CommentInteractionAuthorization.createCommentInteraction, CommentInteractionValidation.createCommentInteraction, CommentInteractionController.createCommentInteraction)
CommentInteractionRouter.put('/', JwtMiddleware.authentication, CommentInteractionAuthorization.updateCommentInteraction, CommentInteractionValidation.updateCommentInteraction, CommentInteractionController.updateCommentInteraction)
CommentInteractionRouter.delete('/', JwtMiddleware.authentication, CommentInteractionAuthorization.deleteCommentInteraction, CommentInteractionValidation.deleteCommentInteraction, CommentInteractionController.deleteCommentInteraction)
CommentInteractionRouter.get('/', CommentInteractionValidation.getCommentInteraction, CommentInteractionController.getCommentInteraction)
CommentInteractionRouter.get('/comment/:commentId/commentInteractionCount', CommentInteractionValidation.getCommentInteractionCountOfComment, CommentInteractionController.getCommentInteractionCountOfComment)