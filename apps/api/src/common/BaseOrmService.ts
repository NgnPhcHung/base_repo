import { Injectable } from "@nestjs/common";
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

interface UserContext {
  id: number;
}

@Injectable()
export abstract class BaseOrmService<T> {
  protected repository: Repository<T>;
  protected ctx: any;

  constructor(
    entityClass: EntityTarget<T>,
    protected readonly entityManager: EntityManager
  ) {
    this.repository = this.entityManager.getRepository(entityClass);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findOne(findConditions: FindOneOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(findConditions);
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
    options?: SaveOptions
  ): Promise<T | T[]> {
    if (Array.isArray(entityOrEntities)) {
      return this.repository.save(
        entityOrEntities as DeepPartial<T>[],
        options
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
    options: FindManyOptions<T>
  ): Promise<{ data: T[]; count: number }> {
    const [result, total] = await this.repository.findAndCount(options);
    return { data: result, count: total };
  }
}
