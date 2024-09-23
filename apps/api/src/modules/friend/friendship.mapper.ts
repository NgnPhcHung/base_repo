import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FriendshipEntity, UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  FriendRequest,
  FriendRequestUpdatingBody,
  Friendship,
  User,
} from '@packages/models';

@Injectable()
export class FriendshipMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        FriendshipEntity,
        Friendship,
        forMember(
          (data) => data.userOne,
          mapFrom((source) => mapper.map(source.userOne, UserEntity, User)),
        ),
        forMember(
          (data) => data.useTwo,
          mapFrom((source) => mapper.map(source.userTwo, UserEntity, User)),
        ),
      );

      createMap(
        mapper,
        FriendshipEntity,
        Friendship,
        // forMember(
        //   (data) => data.friend,
        //   mapFrom((source) =>
        //     mapper.map(source.friend, UserEntity, User),
        //   ),
        // ),
        // forMember(
        //   (data) => data.initiator,
        //   mapFrom((source) => mapper.map(source.initiator, UserEntity, User)),
        // ),
      );
    };
  }
}
