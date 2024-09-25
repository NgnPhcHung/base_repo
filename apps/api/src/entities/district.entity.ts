import { ThingEntity } from '@domains/shared';
import {
    Entity,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { ProvinceEntity } from './province.entity';
import { WardEntity } from './ward.entity';
import Property from 'src/decorators/Property';

@Entity()
export class DistrictEntity extends ThingEntity {
  @Property()
  name: string;

  @Property()
  code: string;

  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  province: ProvinceEntity;

  @OneToMany(() => WardEntity, (ward) => ward.district)
  wards: WardEntity[];
}
