import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FriendRequestEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { PaginationResult, User } from '@packages/models';

@Injectable()
export class FriendMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, FriendRequestEntity, PaginationResult<User>);
    };
  }
}
