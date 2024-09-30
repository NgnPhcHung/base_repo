import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { CategoryStatus } from "../consts";
import { Inventory } from "./Inventory";

export class Category extends Thing {
  @ApiProperty()
  @AutoMap()
  title!: string;

  @ApiProperty({
    type: 'enum',
    enum: CategoryStatus,
    default: CategoryStatus.Inuse,
  })
  @AutoMap()
  status!: CategoryStatus;

  @ApiPropertyOptional({
    nullable: true,
  })
  @AutoMap()
  description?: string;

  @ApiPropertyOptional({ type: Category })
  @AutoMap()
  parent?: Category;

  @ApiPropertyOptional({ type: Category })
  children?: Category[];

  @ApiPropertyOptional({ type: Inventory })
  inventories?: Inventory[];
}
