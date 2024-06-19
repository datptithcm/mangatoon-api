import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class UpdateCommentInteractionRequestDTO {
    @Expose({
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInt()
    commentId: number

    @Expose({
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsInt()
    userId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    interactionType: number
}