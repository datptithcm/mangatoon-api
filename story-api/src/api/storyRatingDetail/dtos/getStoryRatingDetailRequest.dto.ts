import { Expose, Transform } from 'class-transformer'
import { IsOptional, Max, Min } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'
import { transformToNumber } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from '../../story/dtos/enums/group.enum'

export class GetStoryRatingDetailRequestDTO {
    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    storyId: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    userId: number

    @Expose()
    @Transform(transformToNumber, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsOptional()
    @IsInteger()
    @Min(1)
    @Max(5)
    star: number
}