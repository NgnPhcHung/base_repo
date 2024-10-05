import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { OrderItemEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { OrderItem, PurchaseOrderItemCreationBody } from '@packages/models';

@Injectable()
export class OrderItemMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PurchaseOrderItemCreationBody, OrderItemEntity);
      createMap(mapper, OrderItemEntity, OrderItem);
    };
  }
}
