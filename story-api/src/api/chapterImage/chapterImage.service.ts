import { CreateOptions } from 'sequelize'
import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateChapterImageRequestDTO } from './dtos/createChapterImagesRequest.dto'
import { chapterImagesAttributes } from '../../database/models/chapterImages'
import { UpdateChapterImageRequestBodyDTO } from './dtos/updateChapterImageRequest.dto'

export class ChapterImagesService {

    static createChapterImage = (chapterImageData: CreateChapterImageRequestDTO, options?: CreateOptions<chapterImagesAttributes>) => {
        return Models.chapterImages.create(chapterImageData, options)
    }

    static updateChapterImage = (id: number, chapterImageData: UpdateChapterImageRequestBodyDTO) => {
        return Models.chapterImages.update(plainToClass(Object, chapterImageData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }

    static deleteChapterImage = (id: number) => {
        return Models.chapterImages.destroy({
            where: {
                id
            }
        })
    }

    static getChapterImagesByChapterId = (chapterId: number) => {
        return Models.chapterImages.findAll({
            where: {
                chapterId
            }
        })
    }

    static getMostRecentServicePackageTransactionOfUser = async (userId: number) => {
        const rs = await Models.servicePackageTransaction.findAll({
            include: [
                {
                    model: Models.servicePackage,
                    as: 'servicePackage'
                }
            ],
            where: {
                userId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 1
        })
        return rs.length > 0 ? rs[0] : null
    }

    static getInvoice = (userId: number, storyId: number) => {
        return Models.invoice.findOne({
            where: {
                userId,
                storyId
            }
        })
    }

}