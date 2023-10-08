import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail ,  IsNotEmpty, IsString, IsEnum} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { MessageTypes } from 'src/utlis/enum';
import { User } from './user.schema';
import { Reaction } from './reaction.schema';



export type MessageDocument = Document & Message;

@Schema({ timestamps: true })
export class Message {
  @ApiProperty()
  @IsEnum(MessageTypes)
  @Prop({ required: true })
  messageType: MessageTypes;

//   @ApiProperty()
//   @IsEnum(MessageTypes)
//   @Prop({ required: true })
//   type: MessageTypes;

  @ApiProperty()
  @Prop()
  content: string

  @ApiProperty({type: User, required: true})
  @Prop({required: true})
  sender: User

  @ApiProperty({type: Array<Reaction> })
  reactions: Array<Reaction>



 
}

export const MessageSchema = SchemaFactory.createForClass(Message);
