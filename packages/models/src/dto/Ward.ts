import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { District } from "./District";
import { Thing } from "./Thing";

export class Ward extends Thing {
  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiPropertyOptional()
  @AutoMap()
  code?: string;

  @ApiProperty()
  @AutoMap()
  district!: District;

  
}
