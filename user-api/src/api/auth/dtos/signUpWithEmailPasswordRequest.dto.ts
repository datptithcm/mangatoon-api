import { Exclude, Expose, Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

import { transformToBcryptHash } from '../../../helpers/classTransformer.helper'
import { TransformerGroup } from './enums/group.enum'

@Exclude()
export class SignUpWithEmailPasswordRequestDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(75)
    email: string

    @Expose()
    @Transform(transformToBcryptHash, {
        groups: [
            TransformerGroup.EXCLUDE
        ]
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    password: string
}