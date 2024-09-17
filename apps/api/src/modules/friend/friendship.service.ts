import { FriendshipEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class FriendshipService extends Repository<FriendshipEntity> {}
