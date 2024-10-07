import { BaseOrmService } from '@common';
import { CartEntity } from '@entities';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AsyncContextService } from 'src/common/async-context.service';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CartService extends BaseOrmService<CartEntity> {
  constructor(
    @InjectRepository(CartEntity)
    repo: Repository<CartEntity>,
    em: EntityManager,
    @Inject(AsyncContextService)
    private readonly contextService: AsyncContextService,
  ) {
    super(CartEntity, em);
    this.repository = repo;
    console.log(this.contextService.get('user'))
    console.log("cart service called")
  }
  currentUser = this.contextService.get('user');
}
