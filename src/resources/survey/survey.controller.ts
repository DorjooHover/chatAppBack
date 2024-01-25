import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { SurveyDto, UserAnswerDto } from './survey.dto';
import { Roles } from 'src/guards/roles.decorator';
import { UserTypes } from 'src/utlis/enum';

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
    
    @Post()
    create(@Body() dto: SurveyDto, @Request() {user}) {
        return this.service.create(dto, user['_id'])
    }
    
    @Put('edit/:id')
    @ApiParam({name: 'id'})
    edit(@Body() dto: SurveyDto, @Param('id') id: string) {
        return this.service.edit(dto, id)
    }

    @Put('form/:id')
    @ApiParam({name: 'id'})
    form(@Body() dto: UserAnswerDto, @Request() {user}, @Param('id') id: string) {
        return this.service.form(dto, user['_id'], id)
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
