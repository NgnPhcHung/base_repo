import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryStatus } from '@packages/models';
import Property from 'src/decorators/Property';
import { Entity, Index, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';

@Entity()
export class InventoryEntity extends ThingEntity {
  @Index({ fulltext: true })
  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property({ type: 'int', nullable: true })
  quantity?: number;

  @Property({
    type: 'enum',
    enum: InventoryStatus,
    default: InventoryStatus.Unpublished,
  })
  status!: InventoryStatus;

  @ManyToOne(() => CategoryEntity, (category) => category.inventories)
  @ApiProperty({ type: CategoryEntity })
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.settings, { onDelete: 'CASCADE' })
  @ApiProperty()
  @AutoMap()
  user!: UserEntity;
}
