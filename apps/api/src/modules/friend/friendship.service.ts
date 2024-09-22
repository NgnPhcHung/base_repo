import { BaseOrmService } from '@common';
import { FriendshipEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FriendGateway } from './friend.gateway';
import { FriendEvents } from '@packages/models';

@Injectable()
export class FriendshipService extends BaseOrmService<FriendshipEntity> {
  constructor(
    @InjectRepository(FriendshipEntity)
    private friendRepository: Repository<FriendshipEntity>,
    entityManager: EntityManager,
    private friendGateway: FriendGateway,
  ) {
    super(FriendshipEntity, entityManager);
    this.repository = friendRepository;
  }

  async addFriend(initiator: UserEntity, receiver: UserEntity) {
    const newFriend = new FriendshipEntity();
    newFriend.userTwo = receiver;
    newFriend.userOne = initiator;

    await this.save(newFriend);

    this.friendGateway.server
      .to(initiator.id.toString())
      .emit(FriendEvents.AcceptFriendRequest, {});
    this.friendGateway.server
      .to(receiver.id.toString())
      .emit(FriendEvents.AcceptFriendRequest, {});
  }
}
