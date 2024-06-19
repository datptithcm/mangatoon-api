import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import { IsInteger } from '../../../helpers/classValidator.helper'

@Exclude()
export class CreateStoryFollowDetailRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInteger()
    storyId: number

    @Expose()
    @IsNotEmpty()
    @IsInteger()
    userId: number
}