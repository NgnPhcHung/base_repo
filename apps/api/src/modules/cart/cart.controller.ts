import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Authorization, Create, Roles, UpdateAttribute } from '@decorators';
import { CartEntity } from '@entities';
import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Inject,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Cart,
  CartCreationBody,
  CartItemUpdatingBody,
  SingleResult,
  UserRole,
} from '@packages/models';
import { InventoryService } from '../inventory/inventory.service';
import { CartService } from './cart.service';
import { UserService } from '../user/user.service';
import { ensurePromise } from '@packages/shared';

@ApiTags('Carts')
@Controller('carts')
@Authorization()
export class CartController {
  @InjectMapper() mapper: Mapper;
  constructor(
    private cartService: CartService,

    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  @Create({
    endpoint: '/items',
    inputDto: CartCreationBody,
    dto: SingleResult<Cart>,
  })
  @Roles(UserRole.User)
  async addToCart(@Body() body: CartCreationBody) {
    try {
      const { buyer, itemId, quantity, seller } = body;

      const loadedBuyer = await ensurePromise(
        this.userService.findOneBy({ id: buyer }),
        'Buyer in create cart not found',
      );
      const loadedSeller = await ensurePromise(
        this.userService.findOneBy({ id: seller }),
        'Seller of cart item not found',
      );

      const loadedItem = await ensurePromise(
        this.inventoryService.findOneBy({ id: itemId }),
        'Item in cart not found',
      );

      const isValid = await this.inventoryService.isValidInventory(
        loadedItem,
        loadedSeller,
      );
      if (!isValid) {
        throw new BadRequestException('Item does not exist');
      }

      const newCart = await this.cartService.save({
        buyer: loadedBuyer,
        seller: loadedSeller,
        itemData: loadedItem,
        quantity,
      });

      return new SingleResult(this.mapper.map(newCart, CartEntity, Cart));
    } catch (error) {
      throw new Error(error);
    }
  }

  @UpdateAttribute('/cart/items/:id', {
    inputDto: CartItemUpdatingBody,
    dto: Cart,
  })
  @Roles(UserRole.User)
  async updateCartItem(
    @Param('id') id: number,
    @Body() body: CartItemUpdatingBody,
  ) {
    try {
      await ensurePromise(
        this.cartService.findOneBy({ id }),
        'Invalid cart item!',
      );

      const newCartItem = await this.cartService.update(
        { id },
        {
          quantity: body.quantity,
        },
      );

      return new SingleResult(this.mapper.map(newCartItem, CartEntity, Cart));
    } catch (error) {
      throw new Error(error);
    }
  }
}
