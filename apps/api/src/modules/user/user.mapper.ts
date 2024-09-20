import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { User } from '@packages/models';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserEntity,
        User,
        forMember((d) => d.password, ignore()),
        forMember(
          (destination) => destination.fullName,
          mapFrom((source) => source.firstName + ' ' + source.lastName),
        ),
      );
    };
  }
}
