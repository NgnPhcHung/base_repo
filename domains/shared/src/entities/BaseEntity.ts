import { BaseEntity as TypeOrmBaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
}
