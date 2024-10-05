import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/entities/order-item.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { DiscountModule } from '../discount';
import { InventoryModule } from '../inventory/inventory.module';
import { UserModule } from '../user';
import { OrderItemMapper } from './order-item.mapper';
import { OrderController } from './order.controller';
import { OrderMapper } from './order.mapper';
import { OrderRedisService } from './order.redis.service';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => DiscountModule),
  ],
  providers: [
    OrderService,
    OrderRedisService,
    OrderMapper,
    OrderItemMapper,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
