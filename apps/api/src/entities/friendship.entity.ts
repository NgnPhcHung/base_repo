import { ThingEntity } from '@domains/shared';
import { Entity, ManyToOne, Unique } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
@Unique(['initiator', 'friend'])
export class FriendshipEntity extends ThingEntity {
  @ManyToOne(() => UserEntity, (user) => user.friendshipInitiated, {
    onDelete: 'CASCADE',
  })
  initiator: UserEntity; // initiated the friendship

  @ManyToOne(() => UserEntity, (user) => user.friendshipsReceived, {
    onDelete: 'CASCADE',
  })
  friend: UserEntity; //response the friendship request
}
