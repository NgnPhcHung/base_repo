import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Read, Roles } from '@decorators';
import { UserEntity } from '@entities';
import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '@packages/models';
import { CurrentUser } from 'src/decorators/CurrentUser';
import { SettingService } from './setting.service';
import { UserService } from './user.service';

@ApiTags('Settings')
@Controller('settings')
export class SettingController {
  @InjectMapper() mapper: Mapper;
  
  @Inject(UserService)
  private userService: UserService;
  
  @Inject(SettingService)
  private settingService: SettingService;

  @Read('/me', { dto: User })
  @Roles(UserRole.Admin)
  getMe(@CurrentUser() user: User) {
    const mapper = this.mapper.map(user, UserEntity, User);
    return mapper;
  }
}
