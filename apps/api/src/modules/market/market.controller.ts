import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Create, Read, Roles } from '@decorators';
import {
  CategoryEntity,
  DiscountEntity,
  InventoryEntity,
  MarketEntity,
  MarketItemEntity,
} from '@entities';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Category,
  CategoryStatus,
  Discount,
  Inventory,
  InventoryFilterParams,
  InventoryStatus,
  ManyResult,
  MarketCreationBody,
  Order,
  PaginationResult,
  SingleResult,
  UserRole,
} from '@packages/models';
import { ensurePromise } from '@packages/shared';
import { DiscountService } from '../discount/discount.service';
import { CategoryService } from '../inventory/category.service';
import { InventoryService } from '../inventory/inventory.service';
import { MarketRedisService } from './market.redis.service';
import { MarketService } from './market.service';

@ApiTags('Market')
@Controller('market')
export class MarketController {
  @InjectMapper()
  private mapper: Mapper;

  constructor(
    private marketService: MarketService,
    private marketRedisService: MarketRedisService,

    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,

    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,

    @Inject(forwardRef(() => DiscountService))
    private discountService: DiscountService,
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

  /**
   * only accept request from user( user mean buyer role) has role is user,
   * the flow is buyer send checkout shopping cart request PurchaseOrderCreationBody which has discount, then check is discount valid (start or end yet, is active or not, does it still valid for current buyer or not - use times)
   *
   * after that use redis to handle process inventory for order items it payload to prevent multiple order focus on single item and conflict order
   *
   * @return Order dto
   */
  @Create({
    endpoint: '/checkout',
    inputDto: MarketCreationBody,
    dto: Order,
  })
  @Roles(UserRole.User)
  async makeOrder(@Body() payload: MarketCreationBody) {
    try {
      let order: MarketEntity;

      payload.orderItems.forEach(async (item) => {
        const loadedInventory = await ensurePromise(
          this.inventoryService.findOneBy({
            id: item.id,
          }),
          'Given item is invalid',
        );

        await this.marketRedisService.processOrder(loadedInventory.id, item);

        const discount = this.mapper.map(
          payload.discount,
          Discount,
          DiscountEntity,
        );
        const isDiscountAvailable =
          await this.discountService.isDiscountAvailable(discount);

        if (!isDiscountAvailable) {
          throw new UnprocessableEntityException(
            'This discount does not available',
          );
        }

        const isDiscountAvailableForUser =
          await this.discountService.isAvailableForUser(
            discount,
            payload.buyer,
          );

        if (!isDiscountAvailableForUser) {
          throw new UnprocessableEntityException(
            'You already used this discount!',
          );
        }

        const amount = await this.discountService.calculateDiscountValue(
          discount,
          payload.total,
        );

        const orderItem: MarketItemEntity = new MarketItemEntity();
        orderItem.itemData = loadedInventory;
        orderItem.amount = amount;
        orderItem.quantity = item.quantity;

        order.orderItems.push(orderItem);
      });

      await this.marketService.save(order);

      return new SingleResult(order);
    } catch (error) {}
  }
}
