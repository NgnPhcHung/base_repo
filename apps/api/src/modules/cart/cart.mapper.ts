import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CartEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Cart, CartCreationBody } from '@packages/models';

@Injectable()
export class CartMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CartCreationBody, CartEntity);
      createMap(mapper, CartEntity, Cart);
    };
  }
}
