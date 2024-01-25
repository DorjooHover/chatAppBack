import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInfo, ProductInfoDocument } from 'src/schemas';
import { ProductInfoDto } from './info.dto';
import { Messages } from 'src/utlis/strings';
import { ProductInfoTypes, ProductInfoViewTypes } from 'src/utlis/enum';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectModel(ProductInfo.name) private model: Model<ProductInfoDocument>,
  ) {}

  async create(dto: ProductInfoDto, user: string) {
    try {
      const res = await this.model.create({
        user: user,
        ...dto,
      });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findUser(type: ProductInfoTypes) {
    try {
      const res = await this.model.find({
        view: ProductInfoViewTypes.VIEW,
        type: type,
      });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findAll(type: ProductInfoTypes) {
    try {
      const res = await this.model.find({ type: type });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findById(id: string, view: ProductInfoViewTypes) {
    try {
      const res =
        view == ProductInfoViewTypes.ALL
          ? await this.model.findById(id)
          : await this.model.findOne({
              id: id,
              view: view,
            });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }

  async edit(dto: ProductInfoDto, user: string, id: string) {
    try {
      const res = await this.model.updateOne(
        {
          id: id,
        },
        {
          user: user,
          ...dto,
        },
      );
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async delete(id: string) {
    try {
      const res = await this.model.deleteOne({ id });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
}
