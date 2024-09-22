import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities';
import { UserService } from 'src/modules/user/user.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByCondition({ username });
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

  async validateRefreshToken(refreshToken: string) {
    const { user } = await this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    return user;
  }

  async login(user: UserEntity) {
    const access_token = await this.jwtService.signAsync({ user: user.id });
    const refresh_token = await this.jwtService.signAsync(
      { user: user.id },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }

  async generateAccessToken(userId: number) {
    return this.jwtService.sign(
      { user: userId },
      {
        secret: process.env.JWT_SECRET,
      },
    );
  }

  // ---------------
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
