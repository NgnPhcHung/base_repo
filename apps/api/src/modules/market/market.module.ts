import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketItemEntity } from 'src/entities/order-item.entity';
import { MarketEntity } from 'src/entities/order.entity';
import { DiscountModule } from '../discount';
import { InventoryModule } from '../inventory/inventory.module';
import { UserModule } from '../user';
import { MarketItemMapper } from './market-item.mapper';
import { MarketController } from './market.controller';
import { MarketMapper } from './market.mapper';
import { MarketRedisService } from './market.redis.service';
import { MarketService } from './market.service';
import { MarketItemController } from './market-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarketEntity, MarketItemEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => DiscountModule),
  ],
  providers: [
    MarketService,
    MarketRedisService,
    MarketMapper,
    MarketItemMapper,
  ],
  controllers: [MarketController, MarketItemController],
})
export class MarketModule {}
