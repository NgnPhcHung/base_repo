import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserMapper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
