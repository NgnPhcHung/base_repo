import { CartEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { UserModule } from '../user';
import { CartController } from './cart.controller';
import { CartMapper } from './cart.mapper';
import { InventoryModule } from '../inventory';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => InventoryModule),
  ],
  providers: [CartService, CartMapper],
  controllers: [CartController]
})
export class CartModule {}
