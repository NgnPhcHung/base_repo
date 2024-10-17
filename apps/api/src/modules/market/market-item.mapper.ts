import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { MarketItemEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { MarketItem, MarketItemCreationBody } from '@packages/models';

@Injectable()
export class MarketItemMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, MarketItemCreationBody, MarketItemEntity);
      createMap(mapper, MarketItemEntity, MarketItem);
    };
  }
}
