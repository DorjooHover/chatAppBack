import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema, User, UserSchema } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}, {name: User.name, schema: UserSchema}])],
  controllers: [ChatController],
  providers: [ChatService, ]
})
export class ChatModule {}
