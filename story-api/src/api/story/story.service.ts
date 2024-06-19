import { plainToClass, plainToInstance } from 'class-transformer'
import { Op, Sequelize } from 'sequelize'

import { Models } from '../../database/mysql.config'
import { CreateStoryRequestDTO } from './dtos/createStoryRequest.dto'
import { UpdateStoryRequestBodyDTO } from './dtos/updateStoryRequest.dto'
import { GetStoriesRequestDTO } from './dtos/getStoriesRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'
import { SearchStoryRequestDTO } from './dtos/searchStoriesRequest.dto'
import { StoryDTO } from './dtos/story.dto'
import { CustomAliasAttr } from '../../database/models/alias'
import { Set } from '../../helpers/collection.helper'
import { story } from '../../database/models/story'

export class StoryService {

    static createStory = (storyData: CreateStoryRequestDTO) => {
        return Models.story.create(storyData)
    }

    static updateStory = (id: number, storyData: UpdateStoryRequestBodyDTO) => {
        return Models.story.update(plainToClass(Object, storyData, {
                exposeUnsetFields: false
            }), {
            where: {
                id
            }
        })
    }

    static getStories = (queries: GetStoriesRequestDTO) => {
        return Models.story.findAll({
            where: {
                ...plainToClass(Object, plainToClass(GetStoriesRequestDTO, queries, {
                    groups: [
                        TransformerGroup.EXCLUDE    
                    ]
                }), {
                    exposeUnsetFields: false
                }),
                status: {
                    [Op.or]: queries.status instanceof Number ? [queries.status] : queries.status
                }
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            offset: (queries.page-1)*queries.limit,
            limit: queries.limit
        })
    }

    static searchStories = async (queries: SearchStoryRequestDTO) => {
        const res1 = plainToInstance(StoryDTO, (await Models.story.findAll({
            attributes: [
                ...Object.keys(Models.story.getAttributes()),
                [Sequelize.literal(`MATCH (title) AGAINST ('${queries.keyword}')`), 'rel1'],
                [Sequelize.literal(`MATCH (description) AGAINST ('${queries.keyword}')`), 'rel2']
            ],
            where: {
                [Op.and]: [
                    Sequelize.literal(`MATCH (title, description) AGAINST ('${queries.keyword}')`)
                ]
            },
            order: Sequelize.literal('((rel1*1.5)+(rel2)) DESC'),
            limit: 10
        })).map(story => story.dataValues))

        const res2 = (await Models.alias.findAll({
            include: [
                {
                    model: Models.story,
                    as: 'story'
                }
            ],
            where: Sequelize.literal(`MATCH (alias.title) AGAINST ('${queries.keyword}')`),
        })).map(alias => alias.dataValues).map(alias => ((alias as CustomAliasAttr).story as story).dataValues)

        return Array.from(new Set<StoryDTO>().addAll([...res1, ...res2], 'id').values())
    }

    static getStoryCountBelongsToStatus = async (status: Array<number>) => {
        const count = await Models.story.findAndCountAll({
            where: {
                status: {
                    [Op.or]: [
                        ...status
                    ] 
                }
            }
        })
        return count.count
    }

}