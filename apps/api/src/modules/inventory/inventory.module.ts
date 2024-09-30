import { CategoryEntity, InventoryEntity, UserEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from '../kafka/kafka.module';
import { CategoryMapper } from './category.mapper';
import { InventoryController } from './inventory.controller';
import { InventoryMapper } from './inventory.mapper';
import { InventoryService } from './inventory.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryEntity,
      CategoryEntity,
      UserEntity,
      KafkaModule,
    ]),
  ],
  providers: [InventoryMapper, CategoryMapper, InventoryService, UserService],
  controllers: [InventoryController],
})
export class InventoryModule {}
