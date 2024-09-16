import { AutoMap } from '@automapper/classes';
import { BaseEntity as TypeOrmBaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id!: number;
  
}
