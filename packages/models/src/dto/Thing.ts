import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsInt } from "class-validator";

export class Thing {
  @ApiProperty({ required: true })
  @IsInt()
  @AutoMap()
  id!: number;

  @ApiPropertyOptional()
  @AutoMap()
  hash?: string;

  @ApiPropertyOptional()
  @AutoMap()
  isArchived?: boolean;

  @IsDate()
  @ApiPropertyOptional()
  @AutoMap()
  dateCreate?: Date;

  @IsDate()
  @ApiPropertyOptional()
  @AutoMap()
  dateUpdate?: Date;
}
