import { Authorization, CurrentUser, Read } from '@decorators';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationResult, User } from '@packages/models';
import { FriendService } from './friend.service';

@ApiTags('Friends')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  
  @Read('/', { dto: PaginationResult<User> })
  @Authorization()
  getListFriend(@CurrentUser() user: User) {
    
  }
}
