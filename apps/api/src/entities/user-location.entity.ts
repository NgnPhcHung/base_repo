import { ThingEntity } from '@domains/shared';
import Property from 'src/decorators/Property';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { WardEntity } from './ward.entity';

@Entity()
export class UserLocationEntity extends ThingEntity {
  @ManyToOne(() => UserEntity, (user) => user.locations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => WardEntity, (ward) => ward.userLocations)
  @JoinColumn({ name: 'ward_id' })
  ward: WardEntity;

  @Property()
  locationType: string;
}
