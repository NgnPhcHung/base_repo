import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@packages/models';
import { Column, Entity, OneToMany } from 'typeorm';
import { FriendRequestEntity } from './friend-request.entity';
import { FriendshipEntity } from './friendship.entity';
import { SettingEntity } from './setting.entity';
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

  @OneToMany(() => SettingEntity, (setting) => setting.user, { cascade: true })
  @ApiPropertyOptional({nullable: true})
  @AutoMap()
  settings?: SettingEntity[];

  @OneToMany(() => FriendRequestEntity, (friendship) => friendship.sender)
  @ApiPropertyOptional()
  @AutoMap()
  sentFriendRequests?: FriendRequestEntity[];

  @OneToMany(() => FriendRequestEntity, (friendship) => friendship.receiver)
  @ApiPropertyOptional()
  @AutoMap()
  receivedFriendRequests?: FriendRequestEntity[];

  @OneToMany(
    () => FriendshipEntity,
    (friendship) => friendship.initiator,
  )
  @ApiPropertyOptional()
  @AutoMap()
  friendshipInitiated: FriendshipEntity[];

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.friend)
  @ApiPropertyOptional()
  @AutoMap()
  friendshipsReceived: FriendshipEntity[];
}
