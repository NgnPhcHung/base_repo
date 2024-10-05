import { ThingEntity } from '@domains/shared';
import Property from 'src/decorators/Property';
import { Entity, ManyToOne } from 'typeorm';
import { DiscountEntity } from './discount.entity';
import { InventoryEntity } from './inventory.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderItemEntity extends ThingEntity {
  @Property()
  title!: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order!: OrderEntity;

  @Property({ type: 'int' })
  quantity!: number;

  @Property({ type: 'decimal', precision: 2 })
  amount!: number;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.orderItems)
  itemData!: InventoryEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.discountItems)
  discountData?: DiscountEntity;
}
