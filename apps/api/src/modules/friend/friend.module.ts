import { FriendRequestEntity, FriendshipEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { FriendController } from './friend.controller';
import { FriendGateway } from './friend.gateway';
import { FriendService } from './friend.service';
import { FriendRequestMapper } from './friend.mapper';
import { FriendshipService } from './friendship.service';
import { FriendRequestService } from './friend-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FriendRequestEntity,
      FriendshipEntity,
      UserEntity,
    ]),
  ],
  providers: [
    UserService,
    UserService,
    FriendGateway,
    FriendService,
    FriendshipService,
    FriendRequestMapper,
    FriendRequestService,
  ],
  controllers: [FriendController],
})
export class FriendModule {}
