import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { District } from "./District";
import { Thing } from "./Thing";

export class Province extends Thing {
  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @AutoMap()
  code?: string;

  @ApiProperty()
  districts!: District[];
}
