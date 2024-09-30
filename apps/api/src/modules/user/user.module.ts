import { UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserMapper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
