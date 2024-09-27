import { ApiProperty } from "@nestjs/swagger";
import { Pageable } from "../dto/Pageable";
import { District, Province, Ward } from "../dto";

export class LocationQueryParams extends Pageable {
  @ApiProperty()
  province?: Partial<Province>;

  @ApiProperty()
  ward?: Partial<Ward>;

  @ApiProperty()
  district?: Partial<District>;
}
