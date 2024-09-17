import { Mapper } from '@automapper/core';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Authorization, CurrentUser, Read, Update } from '@decorators';
import { Body, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  FriendRequest,
  FriendRequestUpdatingBody,
  Friendship,
  PaginationResult,
  User,
} from '@packages/models';
import { FriendService } from './friend.service';
import { FriendRequestEntity, FriendshipEntity } from '@entities';
import { FriendRequestService } from './friend-request.service';
import { FriendshipService } from './friendship.service';
import { UserService } from '../user/user.service';

@ApiTags('Friends')
@Controller('friends')
@Authorization()
export class FriendController {
  @InjectMapper() mapper: Mapper;

  constructor(
    private readonly userService: UserService,
    private readonly friendService: FriendService,
    private readonly friendshipService: FriendshipService,
    private readonly friendRequestService: FriendRequestService,
  ) {}

  @Read('/requests', { dto: PaginationResult<FriendRequest> })
  @Authorization()
  @UseInterceptors(
    MapInterceptor(FriendRequestEntity, FriendRequest, { isArray: true }),
  )
  async getListFriendRequest(@CurrentUser() user: User) {
    const [listRequest, total] =
      await this.friendRequestService.getListRequest(user);

    return new PaginationResult(
      this.mapper.mapArray(listRequest, FriendRequestEntity, FriendRequest),
      total,
      0,
      20,
    );
  }

  @Update('/request', {
    dto: PaginationResult<Friendship>,
    inputDto: FriendRequestUpdatingBody,
  })
  async acceptRequest(
    @Body() payload: FriendRequestUpdatingBody,
    @CurrentUser() user: User,
  ) {
    try {
      const receiver = await this.userService.findBy({
        id: payload.receiverId,
      });
      const sender = await this.userService.findBy({ id: payload.senderId });
      await this.friendshipService.save({
        initiator: sender,
        friend: receiver,
      });
      return this.friendshipService.findAndCount({
        where: [{ initiator: { id: user.id } }, { friend: { id: user.id } }],
      });
    } catch (error) {}
  }
}
