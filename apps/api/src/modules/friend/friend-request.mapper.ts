import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FriendRequestEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  FriendRequest,
  FriendRequestUpdatingBody,
  User,
} from '@packages/models';

@Injectable()
export class FriendRequestMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        FriendRequestEntity,
        FriendRequest,
        forMember(
          (data) => data.receiver,
          mapFrom((source) => mapper.map(source.receiver, UserEntity, User)),
        ),
        forMember(
          (data) => data.sender,
          mapFrom((source) => mapper.map(source.sender, UserEntity, User)),
        ),
      );
      createMap(mapper, UserEntity, User);
    };
  }
}
