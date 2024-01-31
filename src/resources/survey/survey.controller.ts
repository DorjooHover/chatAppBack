import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { SurveyDto } from './survey.dto';
import { Roles } from 'src/guards/roles.decorator';
import { SurveySortTypes, UserTypes } from 'src/utlis/enum';

@Controller('survey')
@ApiTags('Survey')
@UseGuards(AuthGuard)
export class SurveyController {
    constructor(private service: SurveyService) {
        
    }
    
    @Get()
    findAll() {
        
        return this.service.findAll()
    }

    @Get('get/:id')
    @ApiParam({name: 'id'})
    findById(@Param('id') id: string) {
        return this.service.findById(id)
    }
    @Get('user/:sort')
    @ApiParam({name: 'sort'})
  
    findUser(@Request() {user}, @Param('sort') sort: SurveySortTypes) {
        return this.service.findUser(user['_id'], sort)
    }
    
    @Post()
    create(@Body() dto: SurveyDto, @Request() {user}) {

        return this.service.create(dto, user['_id'])
    }
    
    @Put('edit/:id')
    @ApiParam({name: 'id'})
    edit(@Body() dto: SurveyDto, @Param('id') id: string) {
        return this.service.edit(dto, id)
    }

    
    @Delete(':id')
    @ApiParam({name: 'id'})
    delete(@Param('id') id: string) {
        return this.service.delete(id)
    }

    @Roles(UserTypes.SYSTEM)
    @Delete()
    deleteAll() {
        return this.service.deleteMany()
    }


    
}
