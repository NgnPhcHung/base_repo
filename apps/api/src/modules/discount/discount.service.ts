import { BaseOrmService } from '@common';
import { DiscountEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class DiscountService extends BaseOrmService<DiscountEntity> {
  constructor(
    @InjectRepository(DiscountEntity)
    private repo: Repository<DiscountEntity>,
    em: EntityManager,
  ) {
    super(DiscountEntity, em);
    this.repository = repo;
  }
}
