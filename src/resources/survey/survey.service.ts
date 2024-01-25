import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from 'src/schemas';
import { Messages } from 'src/utlis/strings';
import { SurveyDto, UserAnswerDto } from './survey.dto';

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
      const res = await this.model.create({
        created: user,
        ...dto,
      });
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async edit(dto: SurveyDto, id: string) {
    try {
      const res = await this.model.findByIdAndUpdate(id, dto);
      return res;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async form(dto: UserAnswerDto, user: string, id: string) {
    try {
      const res = await this.model.findByIdAndUpdate(id, {
        $addToSet: {
          users: { user, ...dto },
        },
      });
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
