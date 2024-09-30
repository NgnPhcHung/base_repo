import { Mapper } from '@automapper/core';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Authorization, CurrentUser, Read, Update } from '@decorators';
import { FriendRequestEntity, FriendshipEntity } from '@entities';
import {
  Body,
  Controller,
  Param,
  Query,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  FriendFilterParams,
  FriendRequest,
  FriendRequestFilterParams,
  FriendRequestUpdatingBody,
  Friendship,
  PaginationResult,
  User,
} from '@packages/models';
import { UserService } from '../user/user.service';
import { FriendRequestService } from './friend-request.service';
import { FriendshipService } from './friendship.service';

@ApiTags('Friends')
@Controller('friends')
@Authorization()
export class FriendController {
  @InjectMapper() mapper: Mapper;

  constructor(
    private readonly userService: UserService,
    private readonly friendshipService: FriendshipService,
    private readonly friendRequestService: FriendRequestService,
  ) {}

  @Read('/requests', { dto: PaginationResult<FriendRequest> })
  @Authorization()
  @UseInterceptors(
    MapInterceptor(FriendRequestEntity, FriendRequest, { isArray: true }),
  )
  async getListFriendRequest(
    @CurrentUser() user: User,
    @Query() query: FriendRequestFilterParams,
  ) {
    const [data, total] = await this.friendRequestService.getListRequest(
      user,
      query,
    );

    return new PaginationResult(
      this.mapper.mapArray(data, FriendRequestEntity, FriendRequest),
      total,
      query,
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
  async getListFriend(
    @CurrentUser() user: User,
    @Query() query: FriendFilterParams,
  ) {
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
      ...query
    });

    return new PaginationResult(
      this.mapper.mapArray(data, FriendshipEntity, Friendship),
      count,
      query,
    );
  }
}
