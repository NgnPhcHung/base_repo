import { Mapper } from '@automapper/core';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Authorization, CurrentUser, Read, Update } from '@decorators';
import { FriendRequestEntity, FriendshipEntity, UserEntity } from '@entities';
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
import { UserService } from '../user/user.service';
import { FriendRequestService } from './friend-request.service';
import { FriendGateway } from './friend.gateway';
import { FriendService } from './friend.service';
import { FriendshipService } from './friendship.service';

@ApiTags('Friends')
@Controller('friends')
@Authorization()
export class FriendController {
  @InjectMapper() mapper: Mapper;

  constructor(
    private friendGateway: FriendGateway,
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
    const [data, total] = await this.friendRequestService.getListRequest(user);

    return new PaginationResult(
      this.mapper.mapArray(data, FriendRequestEntity, FriendRequest),
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
      const { userOne, userTwo } = await this.userService.createFriendship(
        payload.senderId,
        payload.receiverId,
      );

      const fs = new FriendshipEntity();
      fs.userOne = userOne;
      fs.userTwo = userTwo;
      await this.friendshipService.save(fs);

      await this.friendRequestService.update(
        { id },
        { status: payload.status },
      );
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException(
        'Can not accept this request, please try again later',
      );
    }
  }

  @Read('/', { dto: PaginationResult<FriendshipEntity> })
  @UseInterceptors(
    MapInterceptor(FriendshipEntity, Friendship, { isArray: true }),
  )
  async getListFriend(@CurrentUser() user: User) {
    const { data, count } = await this.friendshipService.findAndCount({
      relations: ['userOne', 'userTwo'],
      where: [
        {
          userOne: {
            id: user.id,
          },
        },
        {
          userTwo: {
            id: user.id,
          },
        },
      ],
    });

    return new PaginationResult(
      this.mapper.mapArray(data, FriendshipEntity, Friendship),
      count,
      0,
      20,
    );
  }
}
