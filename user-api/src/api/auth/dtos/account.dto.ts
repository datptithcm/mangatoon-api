import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AccountDTO {
    @Expose()
    id: number

    @Expose()
    status: number

    @Expose()
    role: string

    @Expose()
    createdAt: string

    @Expose()
    userId: number
}