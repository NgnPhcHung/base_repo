import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Authorization, Read, Roles } from '@decorators';
import { UserEntity } from '@entities';
import {
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '@packages/models';
import { CurrentUser } from 'src/decorators/CurrentUser';
import { RoleGuard } from 'src/guards/role.guard';
import { Equal, Not } from 'typeorm';
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

  @Read('/user', { dto: User })
  async findUser(@Query('username') username: string) {
    try {
      const foundUser = await this.userService.findBy({
        role: Not(Equal(UserRole.Admin)),
      });
      if (!foundUser) {
        throw new NotFoundException('User does not exist!');
      }
      console.log(foundUser)
      // return this.mapper.map(foundUser, UserEntity, User);
    } catch (error) {
      throw new InternalServerErrorException('User does not exist!');
    }
  }
}
