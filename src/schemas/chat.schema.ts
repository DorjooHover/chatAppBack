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

  @Prop({ required: true })
  types: ChatTypes;

  @Prop({required: true})
  name: string

  @Prop()
  nickname: string

  @Prop()
  number: number

  @Prop()
  pin: Message


  @Prop()
  teacher: User


  @Prop({required: true})
  created: User

  @Prop()
  users: User[]

 
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
