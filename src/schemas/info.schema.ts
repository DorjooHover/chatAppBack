import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import mongoose, { Document, Types } from 'mongoose';
import { ContentTypes, ProductInfoTypes, ProductInfoViewTypes } from 'src/utlis/enum';
import { User } from './user.schema';

import { Chat } from './chat.schema';

export type ProductInfoDocument = Document & ProductInfo;

export class ProductInfoContent {
  @Prop({  })
  type: ContentTypes;
  @Prop()
  content: string;
}

export class SubProductInfo {
  @Prop({ type: Array<ProductInfoContent> })
  list: ProductInfoContent[];
  @Prop()
  title: string;
  @Prop({ type: Array<ProductInfoContent> })
  content: ProductInfoContent[];
}

@Schema({ timestamps: true })
export class ProductInfo {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true, })
  view: ProductInfoViewTypes;
  @Prop({ required: true,  })
  type: ProductInfoTypes;

  @Prop()
  description: string;

  @Prop()
  date: string;

  @Prop()
  ProductInfo: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  user: string;

  @Prop({ type: Array<ProductInfoContent> })
  content: ProductInfoContent[];

  @Prop({ type: Array<SubProductInfo> })
  sub: SubProductInfo[];
}

export const ProductInfoSchema = SchemaFactory.createForClass(ProductInfo);
