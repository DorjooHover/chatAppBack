import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas';

@Module({
    imports: [MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}])],
    controllers: [MessageController],
    providers: [MessageGateway, MessageService],
    exports: [MessageService]
})
export class MessageModule {}
