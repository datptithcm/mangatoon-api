import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class UpdateAccountDTO {
    @Expose()
    status: number

    @Expose()
    role: string
}