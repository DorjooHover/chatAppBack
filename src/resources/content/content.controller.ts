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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { ProductInfoViewTypes, UserTypes } from 'src/utlis/enum';
import { Roles } from 'src/guards/roles.decorator';
import { ContentDto } from './content.dto';

@Controller('content')
@ApiTags('Content')
export class ContentController {
  constructor(private service: ContentService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Post()
  create(@Body() dto: ContentDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user')
  findUser() {
    return this.service.findUser();
  }
  @Get('get/:id')
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string, @Request() { user }) {
    if (user['role'] == UserTypes.USER || user['role'] == UserTypes.TEACHER) {
      return this.service.findById(id, ProductInfoViewTypes.VIEW);
    } else {
      return this.service.findById(id, ProductInfoViewTypes.ALL);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Put(':id')
  @ApiParam({ name: 'id' })
  edit(@Body() dto: ContentDto, @Param('id') id: string) {
    return this.service.edit(dto, id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Delete()
  deleteMany() {
    return this.service.deleteMany();
  }
}
