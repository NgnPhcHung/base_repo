import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Read } from '@decorators';
import { CategoryEntity, InventoryEntity } from '@entities';
import {
  Controller,
  forwardRef,
  Inject,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Category,
  CategoryStatus,
  Inventory,
  InventoryFilterParams,
  InventoryStatus,
  ManyResult,
  PaginationResult,
  SingleResult,
} from '@packages/models';
import { ensurePromise } from '@packages/shared';
import { CategoryService } from '../inventory/category.service';
import { InventoryService } from '../inventory/inventory.service';
import { MarketService } from './market.service';

@ApiTags('Market')
@Controller('market')
export class MarketController {
  @InjectMapper()
  private mapper: Mapper;

  constructor(
    private marketService: MarketService,

    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,

    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,
  ) {}

  @Read('/list-category', { dto: Category })
  async getListCategory() {
    const { data: loadedCategory, count } =
      await this.categoryService.findAndCount({
        where: {
          status: CategoryStatus.Inuse,
        },
        skip: 0,
      });

    return new ManyResult(
      this.mapper.mapArray(loadedCategory, CategoryEntity, Category),
      count,
    );
  }

  @Read('/list-item', { inputDto: PaginationResult<Inventory> })
  async getInventoryByCategory(@Query() query: InventoryFilterParams) {
    const { data: loadedItems, count } = await ensurePromise(
      this.inventoryService.findAndCount({
        ...query,
        where: {
          category: { id: query.categoryId },
          status: query.status as InventoryStatus,
        },
        relations: ['category'],
      }),
      'Item by category not found',
    );

    return new PaginationResult(
      this.mapper.mapArray(loadedItems, InventoryEntity, Inventory),
      count,
      {},
    );
  }

  @Read('/item', {})
  async getItemDetail(@Query('itemId') itemId: number) {
    const loadedItems = await ensurePromise(
      this.inventoryService.findOneBy({
        id: itemId,
      }),
      'Item by category not found',
    );

    return new SingleResult(
      this.mapper.map(loadedItems, InventoryEntity, Inventory),
    );
  }

  @Post('/item/:itemId')
  async orderItem(@Param('itemId') itemId: number) {}
}
