import { ApiProperty } from "@nestjs/swagger";
import { ISingleResult } from "./ISingleResult";

export class SingleResult<T> implements ISingleResult<T> {
  @ApiProperty({ type: () => Object })
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
