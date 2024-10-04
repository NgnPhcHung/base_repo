import { BaseOrmService } from '@common';
import { CategoryEntity, InventoryEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseOrmService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private repo: Repository<CategoryEntity>,
    entityManager: EntityManager,
  ) {
    super(CategoryEntity, entityManager);
    this.repository = repo;
  }
}
