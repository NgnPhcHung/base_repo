import { ThingEntity } from '@domains/shared';
import { OrderStatus } from '@packages/models';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RfqEntity } from './rfq.entity';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './orderItem.entity';

@Entity()
export class OrderEntity extends ThingEntity {
  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'enum', enum: OrderStatus })
  status!: OrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  orderDate?: Date;

  @ManyToOne(() => RfqEntity)
  rfq?: RfqEntity;

  @ManyToOne(() => UserEntity)
  buyer!: UserEntity;

  @ManyToOne(() => UserEntity)
  supplier!: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.order)
  orderItems!: OrderItemEntity[];
}
