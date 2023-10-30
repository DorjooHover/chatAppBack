import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.dto';
import { Messages } from 'src/utlis/strings';
import { UserTypes } from 'src/utlis/enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(dto: UserDto) {

    let user = await this.usersService.findOne(dto.email);
    let message = Messages.successLoggedIn;
    if (!user) {
      user = await this.usersService.create({
        username: dto.username,
        email: dto.email,
        profileImg: dto.profileImg,
        role: UserTypes.USER,
        nickname: dto.nickname ?? '',
      });
      message = Messages.successRegistered;
    }
    const payload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: message,
    };
  }
}
