import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

@Exclude()
export class SignInWithEmailPasswordRequestDTO {
    @Expose()
    @IsNotEmpty()
    email: string

    @Expose()
    @IsNotEmpty()
    password: string
}