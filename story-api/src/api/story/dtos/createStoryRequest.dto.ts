import { Exclude, Expose, Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { TransformerGroup } from './enums/group.enum'
import { transformToNumber } from '../../../helpers/classTransformer.helper'

@Exclude()
export class CreateStoryRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    title: string

    @Expose()
    @IsOptional()
    @IsString()
    description: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    coverImageUrl: string

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    countryId: number
}