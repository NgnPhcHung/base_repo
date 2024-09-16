import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Authorization, CurrentUser, Read } from '@decorators';
import { FriendRequestEntity } from '@entities';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendRequest, PaginationResult, User } from '@packages/models';
import { FriendService } from './friend.service';

@ApiTags('Friends')
@Controller('friends')
@Authorization()
export class FriendController {
  @InjectMapper() mapper: Mapper;

  constructor(private readonly friendService: FriendService) {}

  @Read('/', { dto: PaginationResult<User> })
  @Authorization()
  async getListFriend(@CurrentUser() user: User) {
    const [listRequest, count] = await this.friendService.getList(user);
  }
}
