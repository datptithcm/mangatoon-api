import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class UpdateChapterImageRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsInteger()
    order: number
}

@Exclude()
export class UpdateChapterImageRequestParamDTO {
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