import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class GetStoryAuthorDetailRequestDTO {
    @Expose()
    @Type(() => Number)
    storyId: number

    @Expose()
    @Type(() => Number)
    authorId: number
}