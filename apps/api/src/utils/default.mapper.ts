import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

export class DefaultMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, String, String);
      createMap(mapper, Number, Number);
      createMap(mapper, Boolean, Boolean);
      createMap(mapper, Date, Date);
    };
  }
}
