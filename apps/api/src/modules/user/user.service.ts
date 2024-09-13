import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async findBy(
    options: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.repo.findOne({ where: options });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }
}
