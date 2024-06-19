import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsNotEmpty } from 'class-validator'

@Exclude()
export class CreateCommentInteractionRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    commentId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    userId: number

    @Expose()
    @IsNotEmpty()
    @IsInt()
    interactionType: number
}