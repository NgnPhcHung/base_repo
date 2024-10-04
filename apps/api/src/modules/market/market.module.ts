import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/entities/order-item.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { UserModule } from '../user';
import { MarketController } from './market.controller';
import { MarketRedisService } from './market.redis.service';
import { MarketService } from './market.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => InventoryModule),
  ],
  providers: [MarketService, MarketRedisService],
  controllers: [MarketController],
})
export class MarketModule {}
