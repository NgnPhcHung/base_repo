import { ApiProperty } from "@nestjs/swagger";

export interface ISingleResult<Resource> {
  data?: Resource;
}

export class SingleResult<T> implements ISingleResult<T> {
  @ApiProperty({ type: () => Object })
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
