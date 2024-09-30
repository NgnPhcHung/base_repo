import { BaseOrmService } from '@common';
import { InventoryEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class InventoryService extends BaseOrmService<InventoryEntity> {
  constructor(
    @InjectRepository(InventoryEntity)
    private repo: Repository<InventoryEntity>,
    entityManager: EntityManager,
  ) {
    super(InventoryEntity, entityManager);
    this.repository = repo;
  }
}
