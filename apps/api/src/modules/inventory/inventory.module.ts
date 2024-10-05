import { CategoryEntity, InventoryEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from '../kafka/kafka.module';
import { UserModule } from '../user';
import { CategoryMapper } from './category.mapper';
import { CategoryService } from './category.service';
import { InventoryController } from './inventory.controller';
import { InventoryMapper } from './inventory.mapper';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, CategoryEntity]),
    forwardRef(() => UserModule),
    KafkaModule,
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
