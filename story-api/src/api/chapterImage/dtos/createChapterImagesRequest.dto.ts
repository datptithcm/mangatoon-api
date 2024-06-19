import { Exclude, Expose, Transform } from 'class-transformer'
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class CreateChapterImageRequestDTO {
    @Expose({
        groups: [
            TransformerGroup.EXPOSE_PATHS
        ]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    paths: Array<string>

    @Expose({
        groups: [
            TransformerGroup.EXPOSE_PATH
        ]
    })
    path: string

    @Expose()
    @IsOptional()
    @IsInteger()
    order: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInteger()
    chapterId: number
}