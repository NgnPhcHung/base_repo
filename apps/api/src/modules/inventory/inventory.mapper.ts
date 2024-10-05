import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { InventoryEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Inventory, User } from '@packages/models';

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
        Inventory,
        forMember(
          (data) => data.user,
          mapFrom((source) => mapper.map(source.user, UserEntity, User)),
        ),
      );

      createMap(
        mapper,
        Inventory,
        InventoryEntity,
        forMember(
          (data) => data.user,
          mapFrom((source) => mapper.map(source.user, User, UserEntity)),
        ),
      );
    };
  }
}
