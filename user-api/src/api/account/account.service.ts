import { plainToClass } from 'class-transformer'

import { Models } from '../../database/mysql.config'
import { UpdateAccountDTO } from './dtos/updateAccount.dto'

export class AccountService {

    static updateAccount = (userId: number, accountData: UpdateAccountDTO) => {
        return Models.account.update(plainToClass(Object, accountData, {
            exposeUnsetFields: false
        }), {
            where: {
                userId
            }
        })
    }

}