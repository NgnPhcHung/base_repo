import { ThingEntity } from '@domains/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { FriendRequestStatus } from '@packages/models';

@Entity()
export class FriendRequestEntity extends ThingEntity {
  @ManyToOne(() => UserEntity, (user) => user.sentFriendRequests, {
    onDelete: 'CASCADE',
  })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedFriendRequests, {
    onDelete: 'CASCADE',
  })
  receiver: UserEntity;

  @Column({
    type: 'enum',
    enum: FriendRequestStatus,
    default: FriendRequestStatus.Pending,
  })
  status: FriendRequestStatus;
}
