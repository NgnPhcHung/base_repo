import { ApiProperty } from "@nestjs/swagger";
import { Pageable } from "../dto";

export class ProvinceFilterParam extends Pageable {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  code?: number;
}
