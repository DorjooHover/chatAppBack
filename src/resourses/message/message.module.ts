import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
    controllers: [MessageController],
    providers: [MessageGateway, MessageService]
})
export class MessageModule {}
