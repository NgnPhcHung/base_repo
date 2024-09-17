import { ConflictException, Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { FriendService } from './friend.service';
import { FriendRequestService } from './friend-request.service';

@WebSocketGateway({
  namespace: '/friends',
  transports: ['websocket'],
})
export class FriendGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly userService: UserService,
    private readonly friendService: FriendService,
    private readonly friendRequestService: FriendRequestService,
  ) {}

  @SubscribeMessage('sendFriendRequest')
  async handleFriendRequest(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const receiver = await this.userService.findBy({ id: data.receiverId });
    const sender = await this.userService.findBy({ id: data.senderId });
    const isRequestExisted = await this.friendRequestService.isRequestExisted(
      sender,
      receiver,
    );
    if (isRequestExisted) {
      client.emit('error', {
        message: 'Already send request to this user!',
        code: 409,
      });
      return;
    }

    this.friendRequestService
      .createFriendRequest(sender, receiver)
      .then(() => {
        this.server.to(receiver.id.toString()).emit('receiveFriendRequest', {
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: 'You have a new friend request!',
        });
        client.emit(
          'friendRequestSent',
          'Your friend request has been sent successfully.',
        );
      })
      .catch((err) => {
        console.error('Error sending friend request:', err);
        client.emit('error', 'Failed to send friend request.');
      });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.join(data?.room?.toString());
  }
}
