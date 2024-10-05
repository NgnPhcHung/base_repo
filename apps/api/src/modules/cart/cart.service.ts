import { BaseOrmService } from '@common';
import { CartEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CartService extends BaseOrmService<CartEntity> {
  constructor(
    @InjectRepository(CartEntity)
    repo: Repository<CartEntity>,
    em: EntityManager,
  ) {
    super(CartEntity, em);
    this.repository = repo;
  }
}
