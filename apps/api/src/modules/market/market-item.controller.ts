import { Mapper } from '@automapper/core';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Authorization, Read, UpdateAttribute } from '@decorators';
import { InventoryEntity } from '@entities';
import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Inventory,
  MarketFilterParams,
  PaginationResult,
  SingleResult,
} from '@packages/models';
import { ensurePromise } from '@packages/shared';
import { InventoryService } from '../inventory/inventory.service';
import { query } from 'express';

@ApiTags('Market item')
@Controller('market-items')
@Authorization()
export class MarketItemController {
  @InjectMapper()
  private mapper: Mapper;

  constructor(
    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,
  ) {}

  @Read('/most-viewed', {
    inputDto: MarketFilterParams,
    dto: PaginationResult<Inventory>,
  })
  @UseInterceptors(
    MapInterceptor(InventoryEntity, Inventory, { isArray: true }),
  )
  async getListMostViewed(@Query() query: MarketFilterParams) {
    try {
      const { count, data } = await this.inventoryService.findAndCount({
        ...query,
        sortBy: 'views',
        order: {
          views: 'DESC',
        },
        relations: ['user'],
      });
      
      return new PaginationResult(
        this.mapper.mapArray(data, InventoryEntity, Inventory),
        count,
        {
          cursor: query.cursor,
          limit: query.limit,
          sortBy: query.sortBy,
          sortDirection: query.sortDirection,
        },
      );
    } catch (error) {
      console.log('most viewed error', error);
    }
  }

  @Read('detail/:id', {})
  async getItemDetail(@Param('id', ParseIntPipe) itemId: number) {
    const loadedItems = await ensurePromise(
      this.inventoryService.findOne({
        where: {
          id: itemId,
        },
        relations: ['user'],
      }),
      'Item by category not found',
    );

    return new SingleResult(
      this.mapper.map(loadedItems, InventoryEntity, Inventory),
    );
  }

  @UpdateAttribute('/:id', {
    inputDto: InventoryEntity,
    dto: SingleResult<Inventory>,
  })
  async increaseItemViews(@Param('id') id: number) {
    await this.inventoryService.increaseView(id);
    const loadedItem = await this.inventoryService.findOneBy({ id });
    return new SingleResult(
      this.mapper.map(loadedItem, InventoryEntity, Inventory),
    );
  }
}
