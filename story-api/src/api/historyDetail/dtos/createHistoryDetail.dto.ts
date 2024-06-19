import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CreateHistoryDetailDTO {
    @Expose()
    chapterId: number

    @Expose()
    userId: number
}