import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from '../redis';

@Injectable()
export class OrderRedisService {
  private readonly redisClient: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async processOrder(productId: number, orderDetails: any) {
    const lockKey = `lock:product:${productId}`;
    const lockTimeout = 10000;

    const lock = await this.redisClient.set(
      lockKey,
      'locked',
      'PX',
      lockTimeout,
      'NX',
    );

    if (lock) {
      try {
        //process order for given product
        await new Promise((resole) => setTimeout(resole, 5000));
        // complete order
        this.redisClient.del(lock);
      } catch (error) {
        await this.redisClient.del(lockKey);
        console.log('Error while processing order for product\n', error);
      }
    } else {
      throw new UnprocessableEntityException(
        `Order processing is currently locked for product ${productId}`,
      );
    }
  }
}
