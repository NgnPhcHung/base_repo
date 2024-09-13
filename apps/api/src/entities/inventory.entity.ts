import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryStatus } from '@packages/models';
import { Column, Entity } from 'typeorm';

@Entity()
export class InventoryEntity extends ThingEntity {
  @Column({ unique: true })
  @ApiProperty()
  @AutoMap()
  title: string;

  @Column({ length: 255 })
  @ApiProperty()
  @AutoMap()
  partNo: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty()
  @AutoMap()
  description?: string;

  @Column({ type: 'real' })
  @ApiProperty()
  @AutoMap()
  price: number;

  @Column({ nullable: true, type: 'integer', default: 0 })
  @ApiProperty()
  @AutoMap()
  quantity?: number;

  @Column({ type: 'enum', enum: InventoryStatus, enumName: 'inventory_status' })
  @ApiProperty()
  @AutoMap()
  status: InventoryStatus;
}
