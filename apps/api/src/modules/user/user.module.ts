import { SettingEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SettingEntity])],
  providers: [UserService, SettingService, UserMapper],
  controllers: [UserController, SettingController],
  exports: [UserService, SettingService],
})
export class UserModule {}
