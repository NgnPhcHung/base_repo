import { FriendRequestEntity, FriendshipEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@packages/models';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private repo: Repository<FriendRequestEntity>,
  ) {}

  async createFriendRequest(sender: UserEntity, receiver: UserEntity) {
    try {
      const friendRequest = this.repo.create({
        sender,
        receiver,
      });
      return await this.repo.save(friendRequest);
    } catch (error) {
      throw new Error('Failed to create friend request: ' + error.message);
    }
  }

  async isRequestExisted(sender: UserEntity, receiver: UserEntity) {
    const existingRequest = await this.repo.findOne({
      where: {
        sender: {
          id: sender.id,
        },
        receiver: {
          id: receiver.id,
        },
      },
    });
    return !!existingRequest;
  }

  async getList(user: User) {
    return this.repo.findAndCount({ where: { receiver: { id: user.id } } });
  }
}
