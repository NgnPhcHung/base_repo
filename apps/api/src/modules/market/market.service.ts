import { BaseOrmService } from '@common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketEntity } from 'src/entities/order.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MarketService extends BaseOrmService<MarketEntity> {
  constructor(
    @InjectRepository(MarketEntity)
    private repo: Repository<MarketEntity>,
    em: EntityManager,
  ) {
    super(MarketEntity, em);
    this.repository = repo;
  }
}
