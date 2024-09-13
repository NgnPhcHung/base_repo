import { ThingEntity } from '@domains/shared';
import { RfqStatus } from '@packages/models';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { RfqItemEntity } from './rfqItem.entity';

@Entity()
export class RfqEntity extends ThingEntity {
  @Column({ length: 255, nullable: false })
  title!: string;

  @Column({ type: 'enum', enum: RfqStatus })
  status!: RfqStatus;

  @ManyToMany(() => UserEntity)
  requestTo!: UserEntity[];

  @ManyToOne(() => UserEntity)
  buyer!: UserEntity;

  @OneToMany(() => RfqItemEntity, (item) => item.parentRfq)
  items!: RfqItemEntity[];
}
