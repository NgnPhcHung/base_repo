import { BaseOrmService } from '@common';
import { WardEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class WardService extends BaseOrmService<WardEntity> {
  constructor(
    @InjectRepository(WardEntity)
    private repo: Repository<WardEntity>,
    entityManager: EntityManager,
  ) {
    super(WardEntity, entityManager);
    this.repository = repo;
  }
}
