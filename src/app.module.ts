import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { UserModule } from './resourses/user/user.module';
import { AuthModule } from './resourses/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { MessageModule } from './resourses/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './resourses/chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),

    MongooseModule.forRoot(appConfig().dbUrl, {
      // useNewUrlParser: true,
      // // useUnifiedTopology: true,
      dbName: appConfig().dbName,
    }),

    UserModule,
    AuthModule,
    MessageModule,
    ChatModule,
  ],
  controllers: [],
  providers: [  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  
],
})
export class AppModule {}
