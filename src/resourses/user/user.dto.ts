import { ApiProperty } from "@nestjs/swagger";
import { UserTypes } from "src/utlis/enum";
import {IsEnum, IsEmail, IsString, IsNotEmpty} from 'class-validator'
export class UserDto {
    @ApiProperty({enum: UserTypes})
    @IsEnum(UserTypes)

    role: UserTypes;
  
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()

    email: string
  
    @ApiProperty()
    @IsString()

    username: string
    @ApiProperty({default: 'dorjooX0'})
    @IsString()

    password: string
    @ApiProperty()
    @IsString()

    profileImg: string
  
}