import { Controller, Param , Get, Delete} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('Message')
export class MessageController {
  constructor(private service: MessageService) {}
  @Get(':chat')
  findByChat(@Param('chat') chat: string) 
  {
    return this.service.findByChat(chat)
  }

  @Delete()
  delete() {
    return this.service.deleteAll()
  }
}
