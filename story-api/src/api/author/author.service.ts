import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { CreateAuthorRequestDTO } from './dtos/createAuthorRequest.dto'
import { GetAuthorsRequestDTO } from './dtos/getAuthorsRequestDTO.dto'
import { UpdateAuthorRequestBodyDTO } from './dtos/updateAuthorRequest.dto'

export class AuthorService {

    static getAuthors = (queries: GetAuthorsRequestDTO) => {
        return Models.author.findAll({
            where: {
                ...plainToClass(Object, queries, { 
                    exposeUnsetFields: false
                 })
            }
        })
    }

    static createAuthor = (authorData: CreateAuthorRequestDTO) => {
        return Models.author.create(authorData)
    }

    static updateAuthor = (id: number, authorData: UpdateAuthorRequestBodyDTO) => {
        return Models.author.update(plainToClass(Object, authorData, {
            exposeUnsetFields: false
        }), {
            where: {
                id
            }
        })
    }

    static deleteAuthor = (id: number) => {
        return Models.author.destroy({
            where: {
                id
            }
        })
    }
    
}