import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, User, UserDocument } from 'src/schemas';
import { UserDto } from './user.dto';
import { Messages } from 'src/utlis/strings';
import { UserTypes } from 'src/utlis/enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  async findOne(email: string): Promise<User | undefined> {
    return await this.model.findOne({ email });
  }
  async findById(id: string): Promise<User | undefined> {
    return await this.model.findById(id);
  }

  async findMe(id: String) {
    return await this.model.findById(id);
  }
  async search(type: UserTypes, value: string, user: string) {
    try {

      return value == null || value == ' ' || value == undefined
        ? await this.model
            .find({
              _id: { $ne: user },
              role: type,
            })
            .exec()
        : await this.model
            .aggregate([
              {
                $match: {
                  role: type,
                  $and: [
                    {
                      $or: [
                        { email: { $regex: value } },
                        { username: { $regex: value } },
                      ],
                    },
                    {
                      $ne: { _id: user },
                    },
                  ],
                },
              },
            ])
            .exec();
    } catch (error) {}
  }

  async findAll() {
    return await this.model.find();
  }

  async create(dto: UserDto) {
    try {
      return await this.model.create(dto);
    } catch (error) {}
  }

  async updateOne(user: User, dto: UserDto) {
    try {
      await this.model.findByIdAndUpdate(user['_id'], {
        $set: {
          username: dto.username,
          profileImg: dto.profileImg,
        },
      });
      return Messages.successUpdated;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }

  async deleteMe(id: string) {
    try {
      await this.model.findByIdAndDelete(id);
      return Messages.successDeleted;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteOne(email: string) {
    try {
      await this.model.deleteOne({ email });
      return Messages.successDeleted;
    } catch (error) {
      throw new HttpException(Messages.occured, 500);
    }
  }

  async deleteMany() {
    return await this.model.deleteMany();
  }
}
