import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import mongoose, { Document, Types } from 'mongoose';
import { ContentTypes, QuestionTypes } from 'src/utlis/enum';
import { ContentDetail } from './content.schema';
export type SurveyDocument = Document & Survey;
export class Answer {
    @Prop()
    id: number

    @Prop()
    value: string
}

export class UserAnswer {
    @Prop({type: Types.ObjectId, ref: 'Users'})
    user: string

    @Prop()
    date: string

    @Prop({type: Array<Answer>})
    answers: Answer[]
}

export class Question {
    @Prop()
    type: QuestionTypes
    // index start 1 
    @Prop()
    id: number
    @Prop({ type: Array<ContentDetail> })
    content: ContentDetail[];
    @Prop()
    question: string
    @Prop({type: Array<String>})
    list: string[]
}

@Schema({ timestamps: true })
export class Survey {
  @Prop({ required: true })
  title: string;
  @Prop({ type: Array<ContentDetail> })
  content: ContentDetail[];
  @Prop()
  questions: Question;

  @Prop({type: Array<UserAnswer>, default: []})
  users: UserAnswer[]

  @Prop({type: Types.ObjectId, ref:'Users'})
  created: string
  
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
