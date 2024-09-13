import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@packages/models';
import { Column, Entity } from 'typeorm';
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
}
