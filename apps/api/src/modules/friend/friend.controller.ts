import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Authorization, CurrentUser, Read } from '@decorators';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationResult, User } from '@packages/models';
import { FriendService } from './friend.service';

@ApiTags('Friends')
@Controller('friends')
@Authorization()
export class FriendController {
  @InjectMapper() mapper: Mapper;

  constructor(private readonly friendService: FriendService) {}

  @Read('/requests', { dto: PaginationResult<User> })
  @Authorization()
  async getListFriend(@CurrentUser() user: User) {
    const [listRequest, total] = await this.friendService.getList(user);

    return new PaginationResult(listRequest, total, 0, 20);
  }
}
