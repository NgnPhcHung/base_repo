import { FriendRequestEntity, FriendshipEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendGateway } from './frient.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FriendRequestEntity,
      FriendshipEntity,
      UserEntity,
    ]),
  ],
  providers: [FriendService, FriendGateway],
  controllers: [FriendController],
})
export class FriendModule {}
