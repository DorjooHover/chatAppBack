import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { MessageTypes, ReactionTypes } from 'src/utlis/enum';
import { User } from './user.schema';

import { Chat } from './chat.schema';

export type MessageDocument = Document & Message;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  messageType: MessageTypes;

  //   @Prop({ required: true })
  //   type: MessageTypes;

  @ApiProperty()
  @Prop()
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  sender: string;

  @Prop()
  reactions: Array<Reaction>;

  @Prop()
  chat: string;
  @Prop()
  usersReaction: UserReaction[];
}
export class Reaction {
  @Prop()
  reaction: ReactionTypes;
  @Prop({ default: 0 })
  quantity: number;
}

export class UserReaction {
  @Prop({ type: Types.ObjectId, ref: 'Users' })
  user: string;
  @Prop()
  reaction: ReactionTypes;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
