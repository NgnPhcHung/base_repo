import { DiscountEntity, UserEntity } from '@entities';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity, UserEntity])],
  providers: [DiscountService, UserService],
  controllers: [DiscountController],
})
export class DiscountModule {}
