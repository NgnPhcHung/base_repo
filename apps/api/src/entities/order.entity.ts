import { ThingEntity } from '@domains/shared';
import { OrderStatus } from '@packages/models';
import Property from 'src/decorators/Property';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { DiscountEntity } from './discount.entity';
import { OrderItemEntity } from './order-item.entity';
import { UserEntity } from './user.entity';

@Entity()
export class OrderEntity extends ThingEntity {
  @Property()
  title!: string;

  @Property({ type: 'enum', enum: OrderStatus })
  status!: OrderStatus;

  @Property({ type: 'date' })
  orderDate!: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItem!: OrderItemEntity[];

  @Property({ type: 'decimal', precision: 2 })
  total!: number;

  @ManyToOne(() => UserEntity, (user) => user.ordersAsBuyer)
  buyer!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.ordersAsSeller)
  seller!: UserEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.discountOrders)
  discountData?: DiscountEntity;
}
