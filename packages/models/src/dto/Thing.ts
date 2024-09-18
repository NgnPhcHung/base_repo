import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Thing {
  @ApiProperty({ required: true })
  @AutoMap()
  id!: number;

  @ApiPropertyOptional()
  @AutoMap()
  hash?: string;

  @ApiPropertyOptional()
  @AutoMap()
  isArchived?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  dateCreate?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  dateUpdate?: Date;
}
