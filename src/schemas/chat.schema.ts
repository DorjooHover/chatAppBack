import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail ,  IsNotEmpty, IsString, IsEnum, IsInt} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { ChatTypes } from 'src/utlis/enum';
import { Message } from './message.schema';
import { User } from './user.schema';



export type ChatDocument = Document & Chat;

@Schema({ timestamps: true })
export class Chat {
  @ApiProperty()
  @IsEnum(ChatTypes)
  @Prop({ required: true })
  types: ChatTypes;

  @ApiProperty()
  @IsNotEmpty()
  @Prop({required: true})
  name: string

  @ApiProperty()
  @IsInt()
  @Prop()
  number: number
  
  @ApiProperty({type: Message})
  @Prop()
  pin: Message

  @ApiProperty({type: User, required: true})
  @Prop({required: true})
  teacher: User

  @ApiProperty({type: User, required: true})
  @Prop({required: true})
  created: User




 
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
