import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  FriendEvents,
  SocketEvents
} from '@packages/models';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { FriendRequestService } from './friend-request.service';

@WebSocketGateway({
  namespace: '/friends',
  transports: ['websocket'],
})
export class FriendGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly userService: UserService,
    private readonly friendRequestService: FriendRequestService,
  ) {}

  @SubscribeMessage(FriendEvents.SendFriendRequest)
  async handleFriendRequest(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const receiver = await this.userService.findByCondition({ id: data.receiverId });
    const sender = await this.userService.findByCondition({ id: data.senderId });
    const isRequestExisted = await this.friendRequestService.isRequestExisted(
      sender,
      receiver,
    );
    if (isRequestExisted) {
      client.emit(SocketEvents.Error, {
        message: 'Already send request to this user!',
        code: 409,
      });
      return;
    }

    this.friendRequestService
      .createFriendRequest(sender, receiver)
      .then(() => {
        this.server
          .to(receiver.id.toString())
          .emit(FriendEvents.ReceiveFriendRequest, {
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: 'You have a new friend request!',
          });
        client.emit(
          FriendEvents.FriendRequestSent,
          'Your friend request has been sent successfully.',
        );
      })
      .catch((err) => {
        console.error('Error sending friend request:', err);
        client.emit(SocketEvents.Error, 'Failed to send friend request.');
      });
  }

  @SubscribeMessage(SocketEvents.JoinRoom)
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.join(data?.room?.toString());
  }
}
