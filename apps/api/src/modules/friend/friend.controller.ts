import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';

@ApiTags('Friends')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
}
