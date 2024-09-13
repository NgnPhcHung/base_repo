import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { InventoryEntity } from './inventory.entity';
import { ThingEntity } from '@domains/shared';

@Entity()
export class OrderItemEntity extends ThingEntity {
  @ManyToOne(() => OrderEntity)
  order!: OrderEntity;

  @Column()
  partNo!: string;

  @Column({ nullable: false })
  title!: string;

  @Column()
  quantity!: number;

  @Column({ type: 'json' })
  itemData!: InventoryEntity;
}
