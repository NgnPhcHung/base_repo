import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { InventoryEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import {
    Inventory
} from '@packages/models';

@Injectable()
export class InventoryMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        InventoryEntity,
        Inventory
      );

    };
  }
}
