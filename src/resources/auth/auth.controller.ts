import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserDto } from '../user/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTypes } from 'src/utlis/enum';
import { Roles } from 'src/guards/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  signIn(@Body() dto: UserDto) {
    let res = this.authService.signIn(dto);

    return res;
  }
  // @HttpCode(HttpStatus.CREATED)
  @Post('teacher')
  @ApiBearerAuth('access-token')
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @UseGuards(AuthGuard, RolesGuard)
  teacher(@Body() dto: UserDto) {
    let res = this.authService.createTeacher(dto);

    return res;
  }
}
