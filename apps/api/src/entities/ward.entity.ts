import { ThingEntity } from '@domains/shared';
import {
    Entity,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { DistrictEntity } from './district.entity';
import { UserLocationEntity } from './user-location.entity';
import Property from '../decorators/Property';

@Entity()
export class WardEntity extends ThingEntity {
  @Property()
  name: string;

  @Property()
  code: string;

  @ManyToOne(() => DistrictEntity, (district) => district.wards)
  district: DistrictEntity;

  @OneToMany(() => UserLocationEntity, (userLocation) => userLocation.ward)
  userLocations: UserLocationEntity[];
}
