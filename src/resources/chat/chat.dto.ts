import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Message, User } from 'src/schemas';
import { ChatTypes } from 'src/utlis/enum';

export class ChatDto {
  @ApiProperty({ enum: ChatTypes })
  @IsEnum(ChatTypes)
  types: ChatTypes;

  @ApiProperty()

  name: string;
  @ApiProperty()

  chat: string;
  @ApiProperty()
  nickname: string;

  @ApiProperty()

  number: number;
  @ApiProperty()
  groupNumber: number;

  @ApiProperty()
  pin: string;

  @ApiProperty()
  teacher: string;
  @ApiProperty({isArray: true})
  users: string[];
}
