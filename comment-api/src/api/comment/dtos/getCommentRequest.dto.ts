import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class GetCommentRequestDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    chapterId: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    parentId: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    isOldest: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    page: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    limit: number
}