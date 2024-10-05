import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryStatus } from '@packages/models';
import Property from 'src/decorators/Property';
import { Entity, Index, OneToMany, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './order-item.entity';
import { CartEntity } from './cart.entity';

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

  @ManyToOne(() => UserEntity, user => user.inventories, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  @AutoMap()
  user!: UserEntity;

  @OneToMany(() => OrderItemEntity, orderItem => orderItem.itemData)
  orderItems: OrderItemEntity[]
  
  @OneToMany(() => CartEntity, orderItem => orderItem.itemData)
  cartData: CartEntity[]
}
