import { Exclude, plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateStoryGenreDetailRequestDTO } from './dtos/createStoryGenreDetail.dto'
import { DeleteStoryGenreDetailRequestDTO } from './dtos/deleteStoryGenreDetailRequest.dto'
import { GetStoryGenreDetailRequestDTO } from './dtos/getStoryGenreDetail.dto'

export class StoryGenreDetailService {

    static createStoryGenreDetail = (storyGenreDetailData: CreateStoryGenreDetailRequestDTO) => {
        return Models.storyGenreDetail.create(storyGenreDetailData)
    }

    static deleteStoryGenreDetail = (storyGenreDetailData: DeleteStoryGenreDetailRequestDTO) => {
        return Models.storyGenreDetail.destroy({
            where: {
                ...storyGenreDetailData
            }
        })
    }
    static getStoryGenreDetail = (queries: GetStoryGenreDetailRequestDTO) => {
        return Models.storyGenreDetail.findAll({
            include: [
                {
                    model: Models.story,
                    as: 'story'
                },
                {
                    model: Models.genre,
                    as: 'genre'
                }
            ],
            attributes: {
                exclude: [
                    'storyId',
                    'genreId'
                ]
            },
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

}