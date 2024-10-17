import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { MarketEntity, MarketItemEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  Order,
  MarketCreationBody,
  MarketItemCreationBody,
} from '@packages/models';

@Injectable()
export class MarketMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        MarketCreationBody,
        MarketEntity,
        forMember(
          (data) => data.orderItems,
          mapFrom((source) =>
            mapper.mapArray(
              source.orderItems,
              MarketItemCreationBody,
              MarketItemEntity,
            ),
          ),
        ),
      );
      createMap(mapper, MarketEntity, Order);
    };
  }
}
