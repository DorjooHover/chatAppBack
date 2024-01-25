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

import { ProductInfoDto } from './info.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';
import {
  ProductInfoTypes,
  ProductInfoViewTypes,
  UserTypes,
} from 'src/utlis/enum';
import { ProductInfoService } from './info.service';

@Controller('info')
@ApiTags('Product Info')
export class ProductInfoController {
  constructor(private service: ProductInfoService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Post()
  create(@Body() dto: ProductInfoDto, @Request() { user }) {
    return this.service.create(dto, user['_id']);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Get('all/:type')
  @ApiParam({ name: 'type' })
  findAll(@Param('type') type: ProductInfoTypes) {
    return this.service.findAll(type);
  }
  @Get('user/:type')
  @ApiParam({ name: 'type' })
  findUser(@Param('type') type: ProductInfoTypes) {
    return this.service.findUser(type);
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
  edit(
    @Body() dto: ProductInfoDto,
    @Param('id') id: string,
    @Request() { user },
  ) {
    return this.service.edit(dto, user['_id'], id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserTypes.ADMIN, UserTypes.SYSTEM)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
