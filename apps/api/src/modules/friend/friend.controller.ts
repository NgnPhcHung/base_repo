import { Mapper } from '@automapper/core';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Authorization, CurrentUser, Read, Update } from '@decorators';
import { FriendRequestEntity, FriendshipEntity } from '@entities';
import {
  Body,
  Controller,
  Param,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  FriendRequest,
  FriendRequestUpdatingBody,
  Friendship,
  PaginationResult,
  User,
} from '@packages/models';
import { ensurePromise } from '@packages/shared';
import { UserService } from '../user/user.service';
import { FriendRequestService } from './friend-request.service';
import { FriendService } from './friend.service';
import { FriendshipService } from './friendship.service';

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

  @Update('/request/:id', {
    dto: PaginationResult<Friendship>,
    inputDto: FriendRequestUpdatingBody,
  })
  async acceptRequest(
    @Param('id') id: number,
    @Body() payload: FriendRequestUpdatingBody,
  ) {
    try {
      await ensurePromise(
        this.userService.findBy({
          id: payload.receiverId,
        }),
        'Receiver friend request not found',
      );
      await ensurePromise(
        this.userService.findBy({ id: payload.senderId }),
        'Sender friend request not found',
      );
      await this.friendshipService.save(
        this.mapper.map(payload, FriendRequestUpdatingBody, FriendshipEntity),
      );

      await this.friendRequestService.update(
        { id },
        { status: payload.status },
      );

      return true;

      // await this.friendshipService.save(
      //   this.mapper.map(
      //     { friend: receiver, initiator: sender },
      //     FriendshipEntity,
      //     Friendship,
      //   ),
      // );
      // return this.friendshipService.findAndCount({
      //   where: [{ initiator: { id: user.id } }, { friend: { id: user.id } }],
      // });
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException(
        'Can not accept this request, please try again later',
      );
    }
  }
}
