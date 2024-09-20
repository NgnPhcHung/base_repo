import { BaseOrmService } from '@common';
import { FriendshipEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class FriendshipService extends BaseOrmService<FriendshipEntity> {
  constructor(
    @InjectRepository(FriendshipEntity)
    private friendRepository: Repository<FriendshipEntity>,
    entityManager: EntityManager,
  ) {
    super(FriendshipEntity, entityManager);
    this.repository = friendRepository;
  }
}
