import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import * as entities from './entities';
import { AuthModule, UserModule } from './modules';
import { RedisAppModule } from './modules/redis';
import { DefaultMapper } from './utils';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    RedisAppModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  controllers: [AppController],
  providers: [AppService, DefaultMapper],
})
export class AppModule {}
