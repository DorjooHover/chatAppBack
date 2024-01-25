import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductInfo, ProductInfoSchema } from 'src/schemas';
import { ProductInfoController } from './info.controller';
import { ProductInfoService } from './info.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: ProductInfo.name, schema: ProductInfoSchema
  }])],
  controllers: [ProductInfoController],
  providers: [ProductInfoService]
})
export class ProductInfoModule {}
