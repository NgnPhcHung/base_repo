import { ApiProperty } from "@nestjs/swagger";
import { Inventory } from "./Inventory";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { User } from "./User";

export class Cart extends Thing {
  @ApiProperty()
  @AutoMap()
  itemData!: Inventory;

  @ApiProperty()
  @AutoMap()
  quantity!: number;

  @ApiProperty()
  @AutoMap()
  buyer!: User;

  @ApiProperty()
  @AutoMap()
  seller!: User;
}
