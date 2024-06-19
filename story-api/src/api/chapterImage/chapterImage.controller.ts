import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

import { CreateChapterImageRequestDTO } from './dtos/createChapterImagesRequest.dto'
import { AppResponse } from '../../helpers/response.helper'
import { sequelize } from '../../database/mysql.config'
import { ChapterImagesService } from './chapterImage.service'
import { TransformerGroup } from './dtos/enums/group.enum'
import { handler } from '../../helpers/error.helper'
import { FsHelper } from '../../helpers/fs.helper'
import { UpdateChapterImageRequestBodyDTO, UpdateChapterImageRequestParamDTO } from './dtos/updateChapterImageRequest.dto'
import { DeleteChapterImageRequestParamDTO } from './dtos/deleteChapterImageRequest.dto'
import { GetChapterImagesByChapterIdRequestDTO } from './dtos/getChapterImagesByChapterIdRequest.dto'
import { Role } from '../../enums/role.enum'
import { HistoryDetailService } from '../historyDetail/historyDetail.service'
import { CreateHistoryDetailDTO } from '../historyDetail/dtos/createHistoryDetail.dto'
import { GetImageRequestDTO } from './dtos/getImageRequest.dto'
import axios from 'axios'

export class ChapterImageController {

    static createChapterImages = async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()

        try {
            const createChapterImagesRequestData = plainToClass(CreateChapterImageRequestDTO, req.body, {
                groups: [
                    TransformerGroup.EXCLUDE,
                    TransformerGroup.EXPOSE_PATHS
                ]
            })
            const paths = createChapterImagesRequestData?.paths || (req.files as Express.Multer.File[]).sort((file1, file2) => Number.parseInt(file1.filename.split('.')[0].split('--')[1]) < Number.parseInt(file2.filename.split('.')[0].split('--')[1]) ? -1 : 1).map(file => file.path)            
            for (let path of paths) {
                await ChapterImagesService.createChapterImage(plainToClass(CreateChapterImageRequestDTO, {
                    path,
                    chapterId: createChapterImagesRequestData.chapterId
                }, {
                    groups: [
                        TransformerGroup.EXPOSE_PATH
                    ]
                }), {
                    transaction
                })
            }
            await transaction.commit()
            return res.send(new AppResponse(true, null))
        } catch (error) {
            await transaction.rollback()
            handler(async () => {
                const imgs = req.files as Express.Multer.File[]
                for (let img of imgs) {
                    await FsHelper.deleteFile(path.join(process.cwd(), img.path))
                }
            })
            return next(error)
        }
    }

    static updateChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateChapterImageRequestParamĐata = plainToClass(UpdateChapterImageRequestParamDTO, req.params, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            console.log(updateChapterImageRequestParamĐata);
            
            const updateChapterImageRequestBodyĐata = plainToClass(UpdateChapterImageRequestBodyDTO, req.body)
            console.log(updateChapterImageRequestBodyĐata);
            
            const affectedCount = await ChapterImagesService.updateChapterImage(updateChapterImageRequestParamĐata.id, updateChapterImageRequestBodyĐata)
            if (affectedCount[0] > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteChapterImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteChapterImageRequestData = plainToClass(DeleteChapterImageRequestParamDTO, req.params)
            const deletedCount = await ChapterImagesService.deleteChapterImage(deleteChapterImageRequestData.id)
            if (deletedCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

    static getChapterImagesByChapterId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getChapterImagesByChapterIdRequestData = plainToClass(GetChapterImagesByChapterIdRequestDTO, req.query, {
                groups: [
                    TransformerGroup.EXCLUDE
                ]
            })
            const chapterImages = await ChapterImagesService.getChapterImagesByChapterId(getChapterImagesByChapterIdRequestData.chapterId)
            handler(async () => {
                if (req.user!.role !== Role.GUEST) {
                    await HistoryDetailService.createHistoryDetail(plainToClass(CreateHistoryDetailDTO, {
                        chapterId: getChapterImagesByChapterIdRequestData.chapterId,
                        userId: req.user!.userId
                    } as CreateHistoryDetailDTO))
                }
            }) 
            return res.send(new AppResponse(chapterImages, null))
        } catch (error) {
            return next(error)
        }
    }

    static getImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getImageRequestData = plainToClass(GetImageRequestDTO, req.body)
            const response = await axios.get(getImageRequestData.path, {
                headers: {
                    Referer: 'https://truyenqqviet.com/'
                },
                responseType: 'stream'
            })
            res.setHeader('Content-Type', response.headers['content-type'])
            return response.data.pipe(res)
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

}