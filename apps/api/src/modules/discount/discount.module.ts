import { DiscountEntity, UserEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { DiscountController } from './discount.controller';
import { DiscountMapper } from './discount.mapper';
import { DiscountService } from './discount.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscountEntity, UserEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [DiscountService, DiscountMapper],
  controllers: [DiscountController],
  exports: [DiscountService],
})
export class DiscountModule {}
