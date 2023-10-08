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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(email, pass) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: Messages.successLoggedIn,
    };
  }
  async signUp(dto: UserDto) {
    const user = await this.usersService.create(dto);
    if (!user) {
      throw new HttpException(
        Messages.warningRegistering,
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: Messages.successRegistered
    };
  }
}
