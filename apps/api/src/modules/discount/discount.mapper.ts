import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { DiscountEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Discount } from '@packages/models';

@Injectable()
export class DiscountMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Discount, DiscountEntity);
      createMap(mapper, DiscountEntity, Discount);
    };
  }
}
