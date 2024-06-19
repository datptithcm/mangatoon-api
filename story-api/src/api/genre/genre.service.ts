import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateGenreRequestDTO } from './dtos/createGenreRequest.dto'
import { UpdateGenreRequestBodyDTO } from './dtos/updateGenreRequest.dto'
import { GetGenreRequestDTO } from './dtos/getGenreRequest.dto'

export class GenreService {

    static createGenre = (genreData: CreateGenreRequestDTO) => {
        return Models.genre.create(genreData)
    }

    static deleteGenre = (id: number) => {
        return Models.genre.destroy({
            where: {
                id
            }
        })
    }

    static updateGenre = (id: number, genreData: UpdateGenreRequestBodyDTO) => {
        return Models.genre.update(plainToClass(Object, genreData, {
                exposeUnsetFields: false
            })
        , {
            where: {
                id
            }
        })
    }

    static getGenres= (queries: GetGenreRequestDTO) => {
        return Models.genre.findAll({
            where: {
                ...plainToClass(Object, queries, {
                    exposeUnsetFields: false
                })
            }
        })
    }

}