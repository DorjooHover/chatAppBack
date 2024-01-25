import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from 'src/schemas';
import { ContentDto } from './content.dto';
import { Messages } from 'src/utlis/strings';
import { ProductInfoViewTypes } from 'src/utlis/enum';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private model: Model<ContentDocument>,
  ) {}

  async create(dto: ContentDto) {
    try {
      const res = await this.model.create(dto);
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }

  async edit(dto: ContentDto, id: string) {
    try {
      const res = await this.model.findByIdAndUpdate(id, dto);
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }

  async findAll() {
    try {
      const res = await this.model.find();
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }

  async findUser() {
    try {
      const res = await this.model.find({ view: ProductInfoViewTypes.VIEW });
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
          : await this.model.findOne({ id: id, view: view });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async delete(id: string) {
    try {
      const res = await this.model.deleteOne({ id: id });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteMany() {
    try {
      const res = await this.model.deleteMany();
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
}
