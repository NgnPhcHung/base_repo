import { CategoryEntity, InventoryEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from '../kafka/kafka.module';
import { CategoryMapper } from './category.mapper';
import { CategoryService } from './category.service';
import { InventoryController } from './inventory.controller';
import { InventoryMapper } from './inventory.mapper';
import { InventoryService } from './inventory.service';
import { UserModule } from '../user';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, CategoryEntity, KafkaModule]),
    forwardRef(() => UserModule),
  ],
  providers: [
    InventoryMapper,
    CategoryMapper,
    InventoryService,
    CategoryService,
  ],
  controllers: [InventoryController],
  exports: [InventoryService, CategoryService],
})
export class InventoryModule {}
