import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities';
import { UserService } from 'src/modules/user/user.service';
import { RedisService } from '../redis/redis.service';
import { User } from '@packages/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findBy({ username });
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (isValidPassword) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async register(userDto: UserEntity): Promise<void> {
    await this.userService.create(userDto);
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async login(user: UserEntity) {
    return {
      access_token: this.jwtService.sign({ user: user.id }),
      refresh_token: this.jwtService.sign(
        { user: user.id },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        },
      ),
    };
  }

  async validateRefreshToken(user: User) {
    const refreshToken = await this.getRefreshToken(user.id);
    if (refreshToken) {
      return { user: user.id };
    }
    throw new UnauthorizedException();
  }

  async refreshToken(payload: User) {
    const { user } = await this.validateRefreshToken(payload);

    const sub = { user };

    return {
      access_token: this.jwtService.sign(sub, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
  async saveRefreshToken(
    userId: number,
    refreshToken: string,
    ttl: number,
  ): Promise<void> {
    const key = `user:refreshToken:${userId}`;
    const client = this.redisService.getClient();
    await client.set(key, refreshToken, 'EX', ttl);
  }

  async getRefreshToken(userId: number): Promise<string | null> {
    const key = `user:refreshToken:${userId}`;
    const client = this.redisService.getClient();
    return client.get(key);
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    const key = `user:refreshToken:${userId}`;
    const client = this.redisService.getClient();
    await client.del(key);
  }
}
