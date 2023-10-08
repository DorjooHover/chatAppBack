import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [UserModule, 
      ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
  JwtModule.register({
  
    signOptions: {expiresIn: '7d'},
    secretOrPrivateKey: appConfig().appSecret
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
