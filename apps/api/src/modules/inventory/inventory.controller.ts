import { Authorization, CurrentUser, Read } from '@decorators';
import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import {
  Inventory,
  InventoryFilterParams,
  PaginationResult,
  User,
} from '@packages/models';

@ApiTags('Inventory')
@Controller('inventory')
@Authorization()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Read('/', { dto: PaginationResult<Inventory> })
  async getListInventory(
    @CurrentUser() user: User,
    @Query() query: InventoryFilterParams,
  ) {
    const { data, count } = await this.inventoryService.findAndCount({
      ...query,
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['category', 'user'],
    });
    console.log(query)
    return new PaginationResult(data, count, { ...query });
  }
}
