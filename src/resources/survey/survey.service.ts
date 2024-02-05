import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Survey, SurveyDocument } from 'src/schemas';
import { Messages } from 'src/utlis/strings';
import { SurveyDto } from './survey.dto';
import { SurveySortTypes, SurveyTypes } from 'src/utlis/enum';

@Injectable()
export class SurveyService {
  constructor(@InjectModel(Survey.name) private model: Model<SurveyDocument>) {}

  async findAll() {
    try {
      const res = await this.model.find();
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findUser(user: string, sort: SurveySortTypes) {
    try {
      const res = await this.model
        .find({
          created: user,
        })
        .sort(sort == SurveySortTypes.TITLE ? { title: -1 } : { updatedAt: -1 });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findById(id: string) {
    try {
      const res = await this.model.findById(id);
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async create(dto: SurveyDto, user: string) {
    try {
      const res =
        dto.type == SurveyTypes.ANSWER
          ? await this.model.create({
              user: user,
              ...dto,
            })
          : await this.model.create({
              created: user,
              ...dto,
            });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async edit(dto: SurveyDto, id: string) {
    try {
      const created = new Types.ObjectId(dto.created)
      dto.created = created
      const res = await this.model.findByIdAndUpdate(id, dto);
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
