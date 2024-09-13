// redis.service.ts
import { UserEntity } from '@entities';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClient;

  constructor(private readonly jwtService: JwtService) {
    this.client = new Redis({
      host: 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB, 10),
    });
  }

  getClient(): RedisClient {
    return this.client;
  }

  onModuleInit() {
    this.client.on('connect', () => console.log('Connected to Redis'));
    this.client.on('error', (error) => console.error('Redis Error', error));
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async refreshToken(user: UserEntity) {
    const payload = { user: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
