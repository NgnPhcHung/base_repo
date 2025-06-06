import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { FriendRequestEntity } from './friend-request.entity';
import { FriendshipEntity } from './friendship.entity';
import { UserLocationEntity } from './user-location.entity';
import { UserRole } from '@packages/models';
import { InventoryEntity } from './inventory.entity';
import { MarketEntity } from './order.entity';
import { CartEntity } from './cart.entity';
@Entity()
export class UserEntity extends ThingEntity {
  @Column({ unique: true })
  @ApiProperty()
  @AutoMap()
  username!: string;

  @Column()
  @ApiProperty()
  @AutoMap()
  password!: string;

  @Column()
  @ApiProperty()
  @AutoMap()
  firstName!: string;

  @Column()
  @ApiProperty()
  @AutoMap()
  lastName!: string;

  @Column({ type: 'enum', enum: UserRole })
  @ApiProperty()
  @AutoMap()
  role!: UserRole;

  @OneToMany(() => FriendRequestEntity, (friendship) => friendship.sender)
  @ApiPropertyOptional()
  @AutoMap()
  sentFriendRequests?: FriendRequestEntity[];

  @OneToMany(() => FriendRequestEntity, (friendship) => friendship.receiver)
  @ApiPropertyOptional()
  @AutoMap()
  receivedFriendRequests?: FriendRequestEntity[];

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.userTwo)
  @ApiPropertyOptional()
  @AutoMap()
  @JoinTable()
  userTwo: FriendshipEntity[];

  @OneToMany(() => UserLocationEntity, (userLocation) => userLocation.user)
  locations: UserLocationEntity[];

  @OneToMany(() => InventoryEntity, (inventory) => inventory.user)
  inventories: InventoryEntity[];

  @OneToMany(() => MarketEntity, (order) => order.buyer)
  @ApiPropertyOptional()
  ordersAsBuyer: MarketEntity[];

  @OneToMany(() => MarketEntity, (order) => order.seller)
  @ApiPropertyOptional()
  ordersAsSeller: MarketEntity[];

  
  @OneToMany(() => CartEntity, (order) => order.buyer)
  @ApiPropertyOptional()
  cartForBuyer: CartEntity[];

  @OneToMany(() => CartEntity, (order) => order.seller)
  @ApiPropertyOptional()
  cartForSeller: CartEntity[];
}
