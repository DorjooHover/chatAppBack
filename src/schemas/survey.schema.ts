import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import mongoose, { Document, Types } from 'mongoose';
import { ContentTypes, SurveyTypes, TextBoxTypes } from 'src/utlis/enum';
import { ContentDetail } from './content.schema';
export type SurveyDocument = Document & Survey;

export class SurveyDetail {
  @Prop()
  type: TextBoxTypes;
  // index start 1
  @Prop()
  id: number;
  @Prop({ type: Array<ContentDetail> })
  content: ContentDetail[];
  @Prop()
  question: string;
  @Prop({ type: Array<ContentDetail> })
  list: ContentDetail[];
  @Prop()
  answer: string;
}

@Schema({ timestamps: true })
export class Survey {
  @Prop({ default: 'Unknown title' })
  title: string;
  @Prop({ type: ContentDetail })
  content: ContentDetail;
  @Prop({type: Array<SurveyDetail>})
  values: SurveyDetail[];
  @Prop({ required: true })
  type: SurveyTypes;
  @Prop({ type: Types.ObjectId, ref: 'Surveys' })
  parent: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  created: string;
  @Prop({ type: Types.ObjectId, ref: 'Users' })
  user: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
