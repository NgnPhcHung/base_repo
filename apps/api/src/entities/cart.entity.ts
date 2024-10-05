import { ThingEntity } from '@domains/shared';
import Property from 'src/decorators/Property';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CartEntity extends ThingEntity {
  @ManyToOne(() => InventoryEntity, (inventory) => inventory.cartData)
  itemData: InventoryEntity;

  @Property({ type: 'int' })
  quantity!: number;

  @ManyToOne(() => UserEntity, (user) => user.cartForSeller)
  seller: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.cartForBuyer)
  buyer: UserEntity;
}
