import { RequireIf } from '@decorators';
import { ThingEntity } from '@domains/shared';
import { DiscountApplyType, DiscountType } from '@packages/models';
import Property from 'src/decorators/Property';
import { OneToOne, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class DiscountEntity extends ThingEntity {
  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({
    type: 'enum',
    enum: DiscountType,
    default: DiscountType.FixedAmount,
  })
  discountType!: DiscountType;

  @Property({ type: 'date' })
  startDate!: Date;

  @Property({ type: 'date' })
  endDate!: Date;

  @Property({ type: 'bool', default: false, nullable: true })
  isActive?: boolean;

  @Property({ type: 'int' })
  maxUses!: number;

  @Property({ type: 'int', default: 0 })
  usesCount!: number;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  usersUsed!: UserEntity[];

  @Property({ type: 'int' })
  maxUsedPerUser!: number;

  @Property({ type: 'int' })
  minOrderValue!: number;

  @Property({
    type: 'enum',
    enum: DiscountApplyType,
    default: DiscountApplyType.All,
  })
  applyType: DiscountApplyType;

  @OneToMany(() => OrderItemEntity, (discount) => discount.discountData, {
    onDelete: 'CASCADE',
  })
  discountItems?: OrderItemEntity[];

  @OneToMany(() => OrderEntity, (order) => order.discountData)
  discountOrders?: OrderEntity[];
}
