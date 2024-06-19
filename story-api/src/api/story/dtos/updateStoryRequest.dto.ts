import { Exclude, Expose, Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { TransformerGroup } from './enums/group.enum'
import { transformToNumber } from '../../../helpers/classTransformer.helper'

@Exclude()
export class UpdateStoryRequestBodyDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @MaxLength(250)
    title: string

    @Expose()
    @IsOptional()
    @IsString()
    description: string

    @Expose()
    @IsOptional()
    @IsString()
    coverImageUrl: string

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    status: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    countryId: number
}

@Exclude()
export class UpdateStoryRequestParamDTO {
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