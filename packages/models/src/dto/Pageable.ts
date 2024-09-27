import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export class Pageable {
  @ApiProperty()
  @AutoMap()
  limit?: number = 25;

  @ApiProperty({ enum: ["ASC", "DESC"], type: "enum" })
  @AutoMap()
  @IsEnum({ ASC: "ASC", DESC: "DESC" })
  sortDirection?: "ASC" | "DESC";

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  sortBy?: string = "id";

  @ApiProperty()
  @AutoMap()
  cursor?: number = 0;

  constructor(options: Partial<Pageable>) {
    Object.assign(this, options);
  }
}
