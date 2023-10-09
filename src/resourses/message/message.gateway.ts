import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { MessageDto, MessageReaction } from './message.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard)
export class MessageGateway {
  constructor(private readonly service: MessageService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send')
  async findAll( @ConnectedSocket() client: Socket,@MessageBody() data: MessageDto)  {
    let res = await this.service.create(data);
  
      this.server.emit('responseMessage', {
        sender: res.sender,
        messageType: res.messageType,
        content: res.content,
        reactions: res.reactions,
        chat: res.chat,
        usersReaction: res.usersReaction
      });
    
  }

  @SubscribeMessage('setReaction')
  async identity(@MessageBody() data: MessageReaction){
    let res = await this.service.setReaction(data)
    this.server.emit('responseReaction', {
      reaction: res.reaction,
      id: res['_id'],
    
    });
  }
}
