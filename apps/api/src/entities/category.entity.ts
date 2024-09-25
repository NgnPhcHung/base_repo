import { ThingEntity } from '@domains/shared';
import { CategoryStatus } from '@packages/models';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { ApiProperty } from '@nestjs/swagger';
import Property from 'src/decorators/Property';

@Entity()
export class CategoryEntity extends ThingEntity {
  @Property()
  title!: string;

  @Property({
    type: 'enum',
    enum: CategoryStatus,
    default: CategoryStatus.Unused,
  })
  status: CategoryStatus;

  @Property({
    nullable: true,
  })
  description?: string;

  @ManyToOne(() => CategoryEntity, (cat) => cat.children, { nullable: true })
  @ApiProperty({ type: CategoryEntity })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (cat) => cat.parent, { nullable: true })
  @ApiProperty({ type: CategoryEntity })
  children: CategoryEntity[];

  @OneToMany(() => InventoryEntity, (inventory) => inventory.category)
  @ApiProperty({type: InventoryEntity})
  inventories: InventoryEntity[];
}
