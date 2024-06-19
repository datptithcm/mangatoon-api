import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class UpdateCommentRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(9999)
    content: string

    @Expose()
    @IsOptional()
    @IsInt()
    status: number

    @Expose({
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInt()
    userId: number
}

@Exclude()
export class UpdateCommentRequestParamDTO {
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