import { Inject } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FriendService } from './friend.service';

@WebSocketGateway(3001, { cors: true })
export class FriendGateway {
  @WebSocketServer() server: Server;
  @Inject(FriendService)
  private readonly friendService: FriendService;

  @SubscribeMessage('sendFriendRequest')
  handleFriendRequest(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    this.friendService
      .createFriendRequest(data.senderId, data.receiverId)
      .then(() => {
        this.server
          .to(data.receiverId.toString())
          .emit('receiveFriendRequest', data);
      })
      .catch((err) => {
        console.error('Error sending friend request:', err);
      });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.join(data.userId.toString());
  }
}
