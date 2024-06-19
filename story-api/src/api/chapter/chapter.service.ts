import { plainToClass } from 'class-transformer'
import { Transaction } from 'sequelize'

import { CreateChapterRequestDTO } from './dtos/createChapterRequest.dto'
import { Models } from '../../database/mysql.config'
import { UpdateChapterRequestBodyDTO } from './dtos/updateChapterRequest.dto'
import { GetChapterRequestDTO } from './dtos/getChapterRequest.dto'
import { TransformerGroup } from './dtos/enums/group.enum'

export class ChapterService {

    static createChapter = (chapterData: CreateChapterRequestDTO, transaction?: Transaction) => {
        return Models.chapter.create(chapterData, {
            transaction
        })
    }

    static updateChapter = (id: number, chapterData: UpdateChapterRequestBodyDTO) => {
        return Models.chapter.update(plainToClass(Object, chapterData, {
                exposeUnsetFields: false
            })
        , {
            where: {
                id
            }
        })
    }

    static getChapter = (queries: GetChapterRequestDTO) => {
        return Models.chapter.findAll({
            where: {
                ...plainToClass(Object, plainToClass(GetChapterRequestDTO, queries, {
                    groups: [
                        TransformerGroup.EXCLUDE    
                    ]
                }), {
                    exposeUnsetFields: false
                })
            },
            order: [
                ['order', 'DESC']
            ],
            offset: (queries.page-1)*queries.limit,
            limit: queries.limit
        })
    }

    static getChapterOfStoryCount = async (queries: any) => {
        const count = await Models.chapter.findAndCountAll({
            where: {
                ...queries
            }
        })
        return count.count
    }

}