import { BaseOrmService } from '@common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService extends BaseOrmService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    em: EntityManager,
  ) {
    super(UserEntity, em);
  }

  async findByCondition(
    options: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.repo.findOne({ where: options });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }

  async createFriendship(userOneId: number, userTwoId: number) {
    if (userOneId === userTwoId) {
      throw new Error('A user cannot befriend themselves.');
    }

    const userOne = await this.findOne({
      where: {
        id: userOneId,
      },
    });
    const userTwo = await this.findOne({ where: { id: userTwoId } });

    if (!userOne || !userTwo) {
      throw new Error('One or both users not found.');
    }
    return { userOne, userTwo };
  }
}
