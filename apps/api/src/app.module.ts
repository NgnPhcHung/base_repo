import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ThingEntity } from '@domains/shared';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsyncContextService } from './common/async-context.service';
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
import { AsyncContextMiddleware } from './common/async-context.middleware';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    AuthModule,
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
  providers: [AppService, DefaultMapper, AsyncContextService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AsyncContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
