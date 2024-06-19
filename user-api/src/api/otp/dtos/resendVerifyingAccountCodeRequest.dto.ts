import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, MaxLength } from 'class-validator'

@Exclude()
export class ResendVerifyingAccountCodeRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    id: number

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(75)
    email: string
}