import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CategoryEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Category } from '@packages/models';

@Injectable()
export class CategoryMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CategoryEntity, Category);
    };
  }
}
