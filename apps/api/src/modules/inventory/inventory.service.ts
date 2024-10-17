import { BaseOrmService } from '@common';
import { InventoryEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { EntityManager, Repository } from 'typeorm';
import { RedisService } from '../redis';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class InventoryService extends BaseOrmService<InventoryEntity> {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(InventoryEntity)
    private repo: Repository<InventoryEntity>,
    entityManager: EntityManager,
    private readonly redisService: RedisService,
  ) {
    super(InventoryEntity, entityManager);
    this.repository = repo;
    this.redisClient = this.redisService.getClient();
  }

  async decreaseProductInventory(productId: number, quantity: number) {
    const inventoryKey = `inventory:product:${productId}`;

    const newInventory = await this.redisClient.decrby(inventoryKey, quantity);

    if (newInventory >= 0) {
      //success
    } else {
      // roll back if not enough items
      await this.redisClient.incrby(inventoryKey, quantity);
    }
  }

  async isValidInventory(
    inventory: InventoryEntity,
    seller: UserEntity,
  ): Promise<Boolean> {
    const loadedInventory = await this.findOne({
      where: {
        id: inventory.id,
        user: {
          id: seller.id,
        },
      },
      relations: ['user'],
    });

    return !!loadedInventory;
  }

  async increaseView(id: number) {
    const redisKey = `product:${id}:views`;
    await this.redisClient.incr(redisKey);
  }

  async saveViewsToDatabase(id: number): Promise<void> {
    const redisKey = `product:${id}:views`;
    const views = await this.redisClient.get(redisKey);

    if (views) {
      await this.repo.increment({ id: id }, 'views', parseInt(views, 10));
      await this.redisClient.del(redisKey); // Xóa lượt xem trong Redis sau khi lưu vào DB
    }
  }

  async saveAllViewsToDatabase(): Promise<void> {
    const keys = await this.redisClient.keys('product:*:views');
    for (const key of keys) {
      const productId = parseInt(key.split(':')[1], 10);
      await this.saveViewsToDatabase(productId);
    }
  }

  @Cron('0 */5 * * * *') // 5mins
  async handleCron() {
    console.log('Saving views to database...');
    await this.saveAllViewsToDatabase();
  }
}
