import { ThingEntity } from '@domains/shared';
import Property from 'src/decorators/Property';
import { Entity, ManyToOne } from 'typeorm';
import { DiscountEntity } from './discount.entity';
import { InventoryEntity } from './inventory.entity';
import { MarketEntity } from './order.entity';

@Entity()
export class MarketItemEntity extends ThingEntity {
  @Property()
  title!: string;

  @ManyToOne(() => MarketEntity, (order) => order.orderItems)
  order!: MarketEntity;

  @Property({ type: 'int' })
  quantity!: number;

  @Property({ type: 'decimal', precision: 2 })
  amount!: number;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.orderItems)
  itemData!: InventoryEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.discountItems)
  discountData?: DiscountEntity;
}
