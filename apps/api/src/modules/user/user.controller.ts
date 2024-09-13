import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Authorization, Read, Roles } from '@decorators';
import { UserEntity } from '@entities';
import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '@packages/models';
import { CurrentUser } from 'src/decorators/CurrentUser';
import { RoleGuard } from 'src/guards/role.guard';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
@Authorization(RoleGuard)
export class UserController {
  @InjectMapper() mapper: Mapper;
  @Inject(UserService)
  private userService: UserService;

  @Read('/me', { dto: User })
  @Roles(UserRole.Admin)
  getMe(@CurrentUser() user: User) {
    const mapper = this.mapper.map(user, UserEntity, User);
    return mapper;
  }
}
