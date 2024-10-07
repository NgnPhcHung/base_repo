import { FriendRequestEntity, FriendshipEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { UserMapper } from '../user/user.mapper';
import { FriendRequestMapper } from './friend-request.mapper';
import { FriendRequestService } from './friend-request.service';
import { FriendController } from './friend.controller';
import { FriendGateway } from './friend.gateway';
import { FriendService } from './friend.service';
import { FriendshipMapper } from './friendship.mapper';
import { FriendshipService } from './friendship.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequestEntity, FriendshipEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [
    UserMapper,
    FriendGateway,
    FriendService,
    FriendshipMapper,
    FriendshipService,
    FriendRequestMapper,
    FriendRequestService,
  ],
  controllers: [FriendController],
})
export class FriendModule {}
