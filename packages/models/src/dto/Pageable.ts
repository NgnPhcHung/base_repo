import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min, IsEnum } from "class-validator";

export class Pageable {
  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 25;

  @ApiProperty({ enum: ["ASC", "DESC"], type: "enum" })
  @AutoMap()
  @IsOptional()
  @IsEnum({ ASC: "ASC", DESC: "DESC" })
  sortDirection?: "ASC" | "DESC";

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  sortBy?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  @Min(0)
  cursor?: number = 0;

  constructor(options: Partial<Pageable>) {
    Object.assign(this, options);
  }

  get skip(): number {
    return ((this.cursor || 1) - 1) * (this.limit || 25);
  }
}
