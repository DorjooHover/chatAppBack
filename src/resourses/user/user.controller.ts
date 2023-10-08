import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserTypes } from 'src/utlis/enum';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("User")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @Roles(UserTypes.ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Get('me') 
  findMe(@Request() {user}) {
    return this.service.findMe(user['_id'])
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.service.findOne(email);
  }

  @Put()
  updateOne(@Request() { user }, @Body() dto: UserDto) {
    return this.service.updateOne(user, dto);
  }

  @Delete('me')
  deleteById(@Request() { user }) {
    return this.service.deleteMe(user['_id']);
  }

  @Roles(UserTypes.ADMIN)
  @Delete(':email')
  deleteByEmail(@Param('email') email: string) {
    return this.service.deleteOne(email);
  }
  @Roles(UserTypes.ADMIN)
  @Delete()
  deleteMany() {
    return this.service.deleteMany();
  }
}
