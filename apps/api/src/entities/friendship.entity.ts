import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, Unique } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
@Unique(['userOne', 'userTwo'])
export class FriendshipEntity extends ThingEntity {
  // it's me
  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true
  })
  @ApiProperty()
  @AutoMap()
  userOne: UserEntity; 

  // response the friendship request
  @ManyToOne(() => UserEntity, (user) => user.userTwo, {
    onDelete: 'CASCADE',
    eager: true
  })
  @ApiProperty()
  @AutoMap()
  userTwo: UserEntity; 
}
