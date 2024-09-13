import { ThingEntity } from '@domains/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RfqEntity } from './rfq.entity';

@Entity()
export class RfqItemEntity extends ThingEntity {
  @ManyToOne(() => RfqEntity, { nullable: true })
  parentRfq?: RfqEntity;

  @Column({ type: 'text', nullable: false })
  partNo!: string;

  @Column({ type: 'integer', nullable: false })
  quantity!: number;
}
