import { Exclude, Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'

@Exclude()
export class GetStoryGenreDetailRequestDTO {
    @Expose()
    @IsOptional()
    storyId: string

    @Expose()
    @IsOptional()
    genreId: string
}