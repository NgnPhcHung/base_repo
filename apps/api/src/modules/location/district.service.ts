import { BaseOrmService } from '@common';
import { DistrictEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DistrictService extends BaseOrmService<DistrictEntity> {
  constructor(
    @InjectRepository(DistrictEntity)
    private repo: Repository<DistrictEntity>,
    entityManager: EntityManager,
  ) {
    super(DistrictEntity, entityManager);
    this.repository = repo;
  }
}
