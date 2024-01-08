import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { UserTypes } from 'src/utlis/enum';

export type UserDocument = Document & User;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  role: UserTypes;

  @Prop({ required: true })
  email: string;

  @Prop()
  username: string;

  @Prop()
  nickname: string;

  @Prop()
  profileImg: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
