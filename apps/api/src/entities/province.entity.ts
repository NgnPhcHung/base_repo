import { ThingEntity } from '@domains/shared';
import Property from 'src/decorators/Property';
import { Entity, OneToMany } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity()
export class ProvinceEntity extends ThingEntity {
  @Property()
  name!: string;

  @Property({  nullable: true })
  code?: string;

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[];
}
