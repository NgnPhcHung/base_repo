import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Authorization, Create, CurrentUser } from '@decorators';
import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserCreationBody, UserLoginBody } from '@packages/models';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserEntity } from 'src/entities';
import { CookieJwtGuard } from 'src/guards/cookie.jwt.guard';
import { extractTokenFromHeader } from 'src/utils';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const SEVEN_DAYS = 7 * 24 * 60 * 60;
@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @InjectMapper() mapper: Mapper;
  @Inject(UserService)
  private userService: UserService;

  @Inject(AuthService)
  private authService: AuthService;

  @Create({
    inputDto: UserLoginBody,
    dto: User,
  })
  @UseGuards(AuthGuard('local'))
  async login(@Body() payload: UserLoginBody) {
    const mappedUser = this.mapper.map(payload, UserLoginBody, UserEntity);

    try {
      const user = await this.userService.findBy({
        username: mappedUser.username,
      });
      const { access_token, refresh_token } =
        await this.authService.login(user);
      this.authService.saveRefreshToken(user.id, refresh_token, SEVEN_DAYS);

      return { access_token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Error while creating account, please try again later!',
      );
    }
  }

  @Create({
    inputDto: UserCreationBody,
    endpoint: '/register',
  })
  async register(@Body() payload: UserCreationBody) {
    const user = this.mapper.map(payload, UserCreationBody, UserEntity);
    const existingUser = await this.userService.findBy({
      username: user.username,
    });
    if (existingUser) {
      throw new ConflictException('User already exist');
    }
    try {
      const passwordHashed = await bcrypt.hash(user.password, 10);
      user.password = passwordHashed;
      await this.authService.register(user);
      return true;
    } catch (err) {
      console.log(err);
      throw new Error('Error while creating account please try again');
    }
  }

  @Post('/session/refresh')
  @Authorization()
  async refreshToken(@CurrentUser() user: User) {
    console.log('refreshToken endpoint called');
    // console.log(user)
    const refreshToken = await this.authService.getRefreshToken(user.id);
    const { access_token } = await this.authService.refreshToken(user);

    return { access_token };
  }

  @Post('/session/check')
  @Authorization()
  async checkToken(@Request() req) {
    const getToken = extractTokenFromHeader(req);
    const token = await this.authService.validateToken(getToken);
    console.log('-------------', token);
  }
}
