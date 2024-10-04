import { Injectable } from '@nestjs/common';
import { Pageable } from '@packages/models';
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseOrmService<T> {
  protected repository: Repository<T>;
  protected defaultSortField: keyof T;

  constructor(
    entityClass: EntityTarget<T>,
    protected readonly entityManager: EntityManager,
    defaultSortField?: keyof T,
  ) {
    this.repository = this.entityManager.getRepository(entityClass);
    this.defaultSortField = defaultSortField || ('id' as keyof T);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findOne(findConditions: FindOneOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(findConditions);
  }

  findOneBy(findConditions: FindOptionsWhere<T>): Promise<T | undefined> {
    return this.repository.findOneBy(findConditions);
  }

  create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   *
   * @param target id or unique property in entity
   * @param data DTO
   * @example this.update({ id: loadedRequest.id }, updateDTO)
   */
  async update(target: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>) {
    await this.repository.update(target, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id).then(() => {});
  }

  save(
    entityOrEntities: DeepPartial<T> | DeepPartial<T>[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    if (Array.isArray(entityOrEntities)) {
      return this.repository.save(
        entityOrEntities as DeepPartial<T>[],
        options,
      );
    } else {
      return this.repository.save(entityOrEntities as DeepPartial<T>, options);
    }
  }

  /**
   * 
   * @example const options: FindManyOptions<User> = {
      ...searchOptions,
      take: limit,
      skip: (page - 1) * limit,
    };
    return this.findAndCount(options);
   */
  async findAndCount(
    options: FindManyOptions<T> & Pageable,
  ): Promise<{ data: T[]; count: number }> {
    options.take = options.limit;
    options.skip = options.skip ?? Number(options.cursor || 0) * options.take;

    const [result, total] = await this.repository.findAndCount(options);
    return { data: result, count: total };
  }
}
