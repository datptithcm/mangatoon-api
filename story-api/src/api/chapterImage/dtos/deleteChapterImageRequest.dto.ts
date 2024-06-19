import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'
import { IsInteger } from '../../../helpers/classValidator.helper'

@Exclude()
export class DeleteChapterImageRequestParamDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    id: number
}