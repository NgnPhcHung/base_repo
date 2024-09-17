import { FriendRequestEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestStatus, User } from '@packages/models';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private repo: Repository<FriendRequestEntity>,
  ) {}
}
