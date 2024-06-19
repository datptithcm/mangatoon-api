import { plainToClass } from 'class-transformer'

import { Models, sequelize } from '../../database/mysql.config'
import { CreateStoryFollowDetailRequestDTO } from './dtos/createStoryFollowDetailRequest.dto'
import { GetTopStoriesByFollowCountRequestDTO } from './dtos/getTopStoriesByFollowCountRequest.dto'

export class StoryFollowDetailService {

    static createStoryFollowDetail = (storyFollowDetailData: CreateStoryFollowDetailRequestDTO) => {
        return Models.storyFollowDetail.create(storyFollowDetailData)
    }

    static deleteStoryFollowDetail = (storyFollowDetailData: CreateStoryFollowDetailRequestDTO) => {
        return Models.storyFollowDetail.destroy({
            where: {
                ...storyFollowDetailData
            }
        })
    }

    static getStoryFollowDetail = (queries: CreateStoryFollowDetailRequestDTO) => {
        return Models.storyFollowDetail.findAll({
            include: [
                {
                    model: Models.story,
                    as: 'story'
                }
            ],
            attributes: {
                exclude: [
                    'storyId'
                ]
            },
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

    static getFollowCountOfStory = (storyId: number) => {
        return sequelize.query('CALL GetFollowCountOfStory(:storyId)', {
            replacements: {
                storyId
            }
        })
    }

    static getTopStoriesByFollowCount = (queries: GetTopStoriesByFollowCountRequestDTO) => {
        return sequelize.query('CALL GetTopStoriesByFollowCount(:page, :limit)', {
            replacements: {
                page: queries.page,
                limit: queries.limit
            }
        })
    }

}