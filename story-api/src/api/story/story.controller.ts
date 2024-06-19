import { plainToClass, plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { StoryService } from './story.service'
import { AppResponse } from '../../helpers/response.helper'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateStoryRequestBodyDTO, UpdateStoryRequestParamDTO } from './dtos/updateStoryRequest.dto'
import { handler } from '../../helpers/error.helper'
import { StoryDTO } from './dtos/story.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'
import { StoryStatus } from '../../enums/story.enum'

export class StoryController {

    static createStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createStoryRequestData = plainToClass(CreateStoryRequestDTO, {
                coverImageUrl: req.file?.path ? req.file.path : undefined,
                ...req.body
            } as CreateStoryRequestDTO, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const newStory = await StoryService.createStory(createStoryRequestData)
            return res.send(new AppResponse({ ...newStory.dataValues, id: newStory.id }, null))
        } catch (error) {
            console.log(error)

            handler(async () => {
                if (req.file?.path) {
                    await FsHelper.deleteFile(path.join(process.cwd(), req.file.path))
                }
            })
            return next(error)
        }
    }

    static updateStory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateStoryRequestParamData = plainToClass(UpdateStoryRequestParamDTO, req.params, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const updateStoryRequestBodyData = plainToClass(UpdateStoryRequestBodyDTO, {
                ...req.body,
                coverImageUrl: req.file?.path ? req.file.path : undefined
            } as UpdateStoryRequestBodyDTO, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const oldStoryInfo = plainToInstance(StoryDTO, (await StoryService.getStories({
                id: updateStoryRequestParamData.id,
                page: 1,
                limit: 1
            })).map(story => story.dataValues))
            const affectedcount = await StoryService.updateStory(updateStoryRequestParamData.id, updateStoryRequestBodyData)
            if (affectedcount[0] > 0) {
                handler(async () => {
                    if (oldStoryInfo?.[0] && oldStoryInfo[0].coverImageUrl) {
                        await FsHelper.deleteFile(path.join(process.cwd(), oldStoryInfo[0].coverImageUrl))
                    }
                })
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            handler(async () => {
                if (req.file?.path) {
                    await FsHelper.deleteFile(path.join(process.cwd(), req.file.path))
                }
            })
            return next(error)
        }
    }

    static getStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getStoriesRequestData = plainToClass(GetStoriesRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE,
                    TransformerGroup.EXCLUDE_PAGE_LIMIT,
                    TransformerGroup.EXPOSE_STATUS
                ],
                exposeDefaultValues: true
            })
            const stories = await StoryService.getStories(getStoriesRequestData)
            const count = await StoryService.getStoryCountBelongsToStatus(getStoriesRequestData.status! as number[])
            return res.send(new AppResponse({ stories, count }, null))
        } catch (error) {
            return next(error)
        }
    }

    static searchStories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchStoryRequestData = plainToClass(SearchStoryRequestDTO, req.query)
            const stories = await StoryService.searchStories(searchStoryRequestData)
            return res.send(new AppResponse(stories, null))
        } catch (error) {
            return next(error)
        }
    }

}