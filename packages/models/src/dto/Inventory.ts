import { ApiProperty } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { InventoryStatus } from "../consts";
import { User } from "./User";
import { Category } from "./Category";

export class Inventory extends Thing {
  @ApiProperty()
  @AutoMap()
  title!: string;

  @ApiProperty()
  @AutoMap()
  description!: string;

  @ApiProperty({ type: "decimal" })
  @AutoMap()
  price!: number;

  @ApiProperty({ type: "int", nullable: true })
  @AutoMap()
  quantity?: number;

  @ApiProperty({
    type: "enum",
    enum: InventoryStatus,
    default: InventoryStatus.Unpublished,
  })
  @AutoMap()
  status!: InventoryStatus;

  @ApiProperty({ type: Category })
  category!: Category;

  @ApiProperty()
  @AutoMap()
  user!: User;
}
