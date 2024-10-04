import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ThingEntity } from '@domains/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import * as entities from './entities';
import { AuthModule, UserModule } from './modules';
import { FriendModule } from './modules/friend/friend.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { LocationModule } from './modules/location/location.module';
import { RedisAppModule } from './modules/redis';
import { DefaultMapper } from './utils';
import { DiscountModule } from './modules/discount/discount.module';
import { MarketModule } from './modules/market/market.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    RedisAppModule,
    FriendModule,
    LocationModule,
    InventoryModule,
    DiscountModule,
    MarketModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forFeature(Object.values(entities)),
    TypeOrmModule.forFeature([ThingEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, DefaultMapper],
})
export class AppModule {}
