import { BaseOrmService } from '@common';
import { ProvinceEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProvinceService extends BaseOrmService<ProvinceEntity> {
  constructor(
    @InjectRepository(ProvinceEntity)
    repo: Repository<ProvinceEntity>,
    entityManager: EntityManager,
  ) {
    super(ProvinceEntity, entityManager);
    this.repository = repo;
  }
}
