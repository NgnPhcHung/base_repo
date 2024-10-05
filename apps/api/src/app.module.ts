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
import {
  AuthModule,
  CartModule,
  DiscountModule,
  FriendModule,
  InventoryModule,
  LocationModule,
  OrderModule,
  RedisAppModule,
  UserModule,
} from './modules';
import { DefaultMapper } from './utils';

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
    CartModule,
    OrderModule,
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
