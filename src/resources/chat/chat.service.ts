import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { Chat, ChatDocument, Message, User } from 'src/schemas';
import { ChatDto } from './chat.dto';
import { Messages } from 'src/utlis/strings';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private model: Model<ChatDocument>) {}

  async create(dto: ChatDto, user: User) {
    try {
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
        types: dto.types,
        users: [user],
      });
      return Messages.successCreated;
    } catch (error) {
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

  async findMe(user: User) {
    try {
      return await this.model.find({ users: { $in: user } });
    } catch (error) {
      throw new HttpException(error, 500);
    }
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
