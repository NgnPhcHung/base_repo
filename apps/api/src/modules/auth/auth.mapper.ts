import { createMap, type Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserCreationBody, UserLoginBody } from '@packages/models';
import { UserEntity } from 'src/entities';

@Injectable()
export class AuthMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserLoginBody, UserEntity);
      createMap(mapper, UserCreationBody, UserEntity);
    };
  }
}
