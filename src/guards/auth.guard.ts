import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import * as jwt from 'jsonwebtoken';
import appConfig from 'src/config/app.config';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private reflector: Reflector,
  ) {}
  logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;

    if (!header) return false;

    try {
      const token = header.split(' ')[1];

      const decoded = jwt.verify(token, appConfig().appSecret) as any;

      const user = await this.userService.findOne(decoded.name);

      request.user = user;

      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
