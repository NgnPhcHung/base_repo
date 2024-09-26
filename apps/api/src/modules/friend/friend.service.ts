import { FriendRequestEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private repo: Repository<FriendRequestEntity>,
  ) {}
}
