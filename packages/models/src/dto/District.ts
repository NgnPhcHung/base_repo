import { ApiProperty } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { Province } from "./Province";
import { Ward } from "./Ward";

export class District extends Thing {
  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @AutoMap()
  code!: string;

  @ApiProperty()
  @AutoMap()
  province!: Province;

  @ApiProperty()
  @AutoMap()
  wards!: Ward[];
}
