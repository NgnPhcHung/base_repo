import { BaseOrmService } from '@common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MarketService extends BaseOrmService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private repo: Repository<OrderEntity>,
    em: EntityManager,
  ) {
    super(OrderEntity, em);
    this.repository = repo;
  }
}
