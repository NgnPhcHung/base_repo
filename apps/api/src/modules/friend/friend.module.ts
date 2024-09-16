import { FriendRequestEntity, FriendshipEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendGateway } from './friend.gateway';
import { UserService } from '../user/user.service';
import { FriendMapper } from './friend.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FriendRequestEntity,
      FriendshipEntity,
      UserEntity,
    ]),
  ],
  providers: [FriendService, FriendGateway, UserService],
  controllers: [FriendController, FriendMapper],
})
export class FriendModule {}
