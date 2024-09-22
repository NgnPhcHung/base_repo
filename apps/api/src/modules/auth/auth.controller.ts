import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Create } from '@decorators';
import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  SingleResult,
  User,
  UserCreationBody,
  UserLoginBody,
} from '@packages/models';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserEntity } from 'src/entities';
import { ExpressRequest } from 'src/types';
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
    inputDto: UserCreationBody,
    endpoint: '/register',
  })
  async register(@Body() payload: UserCreationBody) {
    const user = this.mapper.map(payload, UserCreationBody, UserEntity);
    const existingUser = await this.userService.findByCondition({
      username: user.username,
    });
    if (existingUser) {
      throw new ConflictException('This name already taken!');
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

  @Create({
    inputDto: UserLoginBody,
    dto: User,
  })
  @UseGuards(AuthGuard('local'))
  async login(@Body() payload: UserLoginBody, @Res() res: Response) {
    const mappedUser = this.mapper.map(payload, UserLoginBody, UserEntity);

    try {
      const user = await this.userService.findByCondition({
        username: mappedUser.username,
      });
      const { access_token, refresh_token } =
        await this.authService.login(user);
      this.authService.saveRefreshToken(user.id, refresh_token, SEVEN_DAYS);
      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/v1/api/auth/session/refresh',
        sameSite:"strict",
        secure: true,
      });
      return res.send(new SingleResult({ access_token }));
    } catch (error) {
      throw new UnauthorizedException(
        'Error while creating account, please try again later!',
      );
    }
  }

  @Post('/session/refresh')
  async refreshAccessToken(@Req() req: ExpressRequest) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw new ForbiddenException('Refresh token not provided');
      }
      const user = await this.authService.validateRefreshToken(refreshToken);
      if (!user) {
        throw new ForbiddenException('Token invalid');
      }
      const access_token = await this.authService.generateAccessToken(user);
      return new SingleResult({ access_token });
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Unable to refresh access token');
    }
  }
}
