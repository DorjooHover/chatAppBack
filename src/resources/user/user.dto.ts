import { ApiProperty } from '@nestjs/swagger';
import { UserTypes } from 'src/utlis/enum';
import { IsEnum, IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class UserDto {
  @ApiProperty()
  role: UserTypes;

  @ApiProperty()
  email: string;

  @ApiProperty()
  // @IsString()
  username: string;

  @ApiProperty()
  nickname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  // @IsString()
  profileImg: string;
}
