import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { OrderEntity, OrderItemEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  Order,
  PurchaseOrderCreationBody,
  PurchaseOrderItemCreationBody,
} from '@packages/models';

@Injectable()
export class OrderMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        PurchaseOrderCreationBody,
        OrderEntity,
        forMember(
          (data) => data.orderItems,
          mapFrom((source) =>
            mapper.mapArray(
              source.orderItems,
              PurchaseOrderItemCreationBody,
              OrderItemEntity,
            ),
          ),
        ),
      );
      createMap(mapper, OrderEntity, Order);
    };
  }
}
