import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { Roles } from 'src/guards/roles.decorator';

import { UserTypes } from 'src/utlis/enum';
import { ChatDto } from './chat.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('chat')
@ApiTags('Chat')
@UseGuards(AuthGuard)
@ApiBearerAuth("access-token")
export class ChatController {
  constructor(private service: ChatService) {}
  @Post()
  create(@Body() dto: ChatDto, @Request() { user }) {
    console.log(user);
    return this.service.create(dto, user['_id']);
  }

  @Roles(UserTypes.ADMIN)
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Roles(UserTypes.ADMIN)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('/me')
  findByMe(@Request() { user }) {
    return this.service.findMe(user['_id']);
  }

  @Get('/join/:id')
  join(@Param('id') id: string, @Request() { user }) {
    return this.service.join(id, user['_id']);
  }

  @Roles(UserTypes.ADMIN)

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
  @Roles(UserTypes.SYSTEM)
  @Delete()
  delete() {
    return this.service.delete();
  }
}
