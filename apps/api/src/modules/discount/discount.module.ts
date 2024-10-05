import { DiscountEntity, UserEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { UserService } from '../user/user.service';
import { DiscountMapper } from './discount.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity, UserEntity])],
  providers: [DiscountService, UserService, DiscountMapper],
  controllers: [DiscountController],
  exports: [DiscountService],
})
export class DiscountModule {}
