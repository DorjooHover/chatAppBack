import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { Message, User } from "src/schemas";
import { ChatTypes } from "src/utlis/enum";

export class ChatDto {
    @ApiProperty({enum: ChatTypes})
    @IsEnum(ChatTypes)
    types: ChatTypes;

    @ApiProperty()
    @IsNotEmpty()
    name: string
    @ApiProperty()
    nickname: string
  
    @ApiProperty()
    @IsInt()
    number: number
    
    @ApiProperty({type: Message})
    pin: Message
  
    @ApiProperty({type: User})
    teacher: User


}