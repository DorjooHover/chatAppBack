import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, model } from 'mongoose';
import { Chat, ChatDocument, Message, User } from 'src/schemas';
import { ChatDto } from './chat.dto';
import { Messages } from 'src/utlis/strings';
import { ChatTypes } from 'src/utlis/enum';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private model: Model<ChatDocument>) {}

  async create(dto: ChatDto, user: string) {
    try {
      
      const chat = await this.model.findById(new Types.ObjectId(dto.chat));
      if(chat) {

        await this.model.create({
          created: user,
          name: chat.name,
          number: chat.number,
          nickname: chat.nickname,
          groupNumber: chat.groupNumber,
          teacher: chat.teacher,
          types: dto.types,
          users: [user, ...dto.users],
        });
      } else {
        await this.model.create({
          created: user,
          name: dto.name,
          number: dto.number,
          nickname:
            dto.nickname != undefined
              ? dto.nickname
              : `${dto.name.toUpperCase} ${
                  dto.number != undefined ? dto.number : ''
                }`,
          groupNumber: dto.groupNumber,
          teacher: dto.teacher,
          types: dto.types,
          users: [user, ...dto.users],
        });
      }
      return Messages.successCreated;
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findById(id: string) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findMe(type: ChatTypes, user: string) {
    try {
      const t = type.toUpperCase();
      if (t == ChatTypes.ALL) {
        return await this.model.find({ users: { $in: [user] } });
      } else {
        return await this.model.find({ types: t, users: { $in: [user] } });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async search(value: string, type: ChatTypes) {
    try {
      let n = Number(value);
      if (type == ChatTypes.ALL) {
        return value == null || value == ' ' || value == undefined
          ? await this.model.find().exec()
          : await this.model
              .aggregate([
                {
                  $match: {
                    $or: [
                      { nickname: { $regex: value } },
                      { name: { $regex: value } },
                      { number: n },
                      { groupNumber: n },
                    ],
                  },
                },
              ])
              .exec();
      } else {
        return value == null || value == ' ' || value == undefined
          ? await this.model.find({ types: type }).exec()
          : await this.model
              .aggregate([
                {
                  $match: {
                    types: type,
                    $or: [
                      { nickname: { $regex: value } },
                      { name: { $regex: value } },
                      { number: n },
                      { groupNumber: n },
                    ],
                  },
                },
              ])
              .exec();
      }
    } catch (error) {}
  }

  async join(id: string, user: string) {
    try {
      await this.model.findByIdAndUpdate(id, {
        $addToSet: { users: user },
      });
      return Messages.successJoin;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async deleteById(id: string) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async delete() {
    try {
      return await this.model.deleteMany();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
