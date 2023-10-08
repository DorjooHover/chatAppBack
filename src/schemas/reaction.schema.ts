import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail ,  IsInt, IsString, IsEnum} from 'class-validator';
import mongoose, { Document } from 'mongoose';



export type ReactionDocument = Document & Reaction;

@Schema({ timestamps: true })
export class Reaction {


  @ApiProperty()
  @IsInt()
  @Prop({required: true})
  email: string

  @ApiProperty({type: Number})
  @IsInt()
  @Prop({default: 1})
  quantity: number



 
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
