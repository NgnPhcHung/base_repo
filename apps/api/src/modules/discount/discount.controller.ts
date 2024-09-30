import { Authorization } from '@decorators';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountService } from './discount.service';

@ApiTags('Discount')
@Controller('discount')
@Authorization()
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  
}
