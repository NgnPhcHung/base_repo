import { AutoMap } from '@automapper/classes';
import { ThingEntity } from '@domains/shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class SettingEntity extends ThingEntity {
  @ManyToOne(() => UserEntity, (user) => user.settings, { onDelete: 'CASCADE' })
  @ApiProperty()
  @AutoMap()
  user!: UserEntity;

  @Column({ unique: true })
  @ApiProperty()
  @AutoMap()
  name!: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  mode?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  fps?: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  resolution?: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  fullscreen?: boolean;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  volumeLevel?: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  mute?: boolean;

  @Column({ default: true, nullable: true })
  @ApiPropertyOptional()
  @AutoMap()
  microphoneEnabled: boolean;
}
