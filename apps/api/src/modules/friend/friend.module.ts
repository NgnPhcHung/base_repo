import { FriendRequestEntity, FriendshipEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { FriendController } from './friend.controller';
import { FriendGateway } from './friend.gateway';
import { FriendService } from './friend.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FriendRequestEntity,
      FriendshipEntity,
      UserEntity,
    ]),
  ],
  providers: [FriendService, FriendGateway, UserService],
  controllers: [FriendController],
})
export class FriendModule {}
