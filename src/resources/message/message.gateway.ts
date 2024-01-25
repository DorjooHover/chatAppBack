import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
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
// @UseGuards(AuthGuard)
export class MessageGateway {
  constructor(private readonly service: MessageService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('join')
  join(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.join(data);
  }
  @SubscribeMessage('leave')
  leave(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.leave(data);
  }
  @SubscribeMessage('message')
  async findAll(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageDto,
  ) {
    if (
      data.content == null ||
      data.content == undefined ||
      data.content == ''
    ) {
    } else {
      await this.service.create(data);
    }
    const messages = await this.service.findByChat(data.chat);

    this.server.to(data.chat).emit('message', {
      messages: messages,
    });
  }

  @SubscribeMessage('setReaction')
  async identity(@MessageBody() data: MessageReaction) {
    let res = await this.service.setReaction(data);
    this.server.emit('responseReaction', {
      reaction: res.reaction,
      id: res['_id'],
    });
  }
}
