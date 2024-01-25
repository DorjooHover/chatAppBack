import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document, Mongoose, Types } from 'mongoose';
import { ContentTypes, ProductInfoViewTypes } from 'src/utlis/enum';

export type ContentDocument = Document & Content;

export class ContentDetail {
  @Prop({ required: true })
  type: ContentTypes;

  @Prop({ required: true })
  content: string;

  @Prop()
  title: string;
}
export class SubContent {
  @Prop({ type: Array<ContentDetail> })
  list: ContentDetail[];

  @Prop({ type: Array<ContentDetail> })
  content: ContentDetail[];

  @Prop()
  title: string;
}

@Schema({ timestamps: true })
export class Content {
  @Prop({ type: ContentDetail })
  content: ContentDetail;

  @Prop({ type: Array<SubContent> })
  sub: SubContent[];

  @Prop()
  view: ProductInfoViewTypes
}

export const ContentSchema = SchemaFactory.createForClass(Content);
