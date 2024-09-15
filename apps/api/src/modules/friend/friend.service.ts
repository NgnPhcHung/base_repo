import { FriendRequestEntity, FriendshipEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private repo: Repository<FriendRequestEntity>,
  ) {}

  async createFriendRequest(senderId: number, receiverId: number) {
    const friendRequest = this.repo.create({
      sender: {
        id: senderId,
      },
      receiver: {
        id: receiverId,
      },
    });
    return this.repo.save(friendRequest);
  }
}
