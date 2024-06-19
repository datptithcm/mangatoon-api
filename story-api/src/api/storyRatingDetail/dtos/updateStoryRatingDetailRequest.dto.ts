import { Expose } from 'class-transformer'
import { IsNotEmpty, Max, Min } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'

export class UpdateStoryRatingDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInteger()
    storyId: number

    @Expose()
    @IsNotEmpty()
    @IsInteger()
    userId: number

    @Expose()
    @IsNotEmpty()
    @IsInteger()
    @Min(1)
    @Max(5)
    star: number
}