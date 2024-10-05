import { BaseOrmService } from '@common';
import { InventoryEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { EntityManager, Repository } from 'typeorm';
import { RedisService } from '../redis';

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
      where: { id: inventory.id, user: {
        id: seller.id
      } },
      relations: ['user'],
    });
    console.log(loadedInventory);

    return !!loadedInventory;
  }
}
