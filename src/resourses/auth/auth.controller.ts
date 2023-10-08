import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDto } from '../user/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private authService: AuthService){}
    @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return  this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register') 
  signUp(@Body() dto: UserDto) {
    return this.authService.signUp(dto)
  }
  
}
