import { ThingEntity } from '@domains/shared';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryStatus } from '@packages/models';
import Property from 'src/decorators/Property';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InventoryEntity } from './inventory.entity';

@Entity()
export class CategoryEntity extends ThingEntity {
  @Property()
  title!: string;

  @Property({
    type: 'enum',
    enum: CategoryStatus,
    default: CategoryStatus.Inuse,
  })
  status: CategoryStatus;

  @Property({
    nullable: true,
  })
  description?: string;

  @OneToMany(() => InventoryEntity, (inventory) => inventory.category, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: InventoryEntity })
  inventories: InventoryEntity[];
}
