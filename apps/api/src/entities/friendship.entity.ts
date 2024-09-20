import { ThingEntity } from '@domains/shared';
import { Entity, ManyToOne, Unique } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
@Unique(['initiator', 'friend'])
export class FriendshipEntity extends ThingEntity {
  @ManyToOne(() => UserEntity, (user) => user.friendshipInitiated, {
    onDelete: 'CASCADE',
  })
  initiator: number; // initiated the friendship

  @ManyToOne(() => UserEntity, (user) => user.friendshipsReceived, {
    onDelete: 'CASCADE',
  })
  friend: number; //response the friendship request
}
