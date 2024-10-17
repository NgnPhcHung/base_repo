import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { Discount } from "./Discount";
import { Inventory } from "./Inventory";

export class MarketItem extends Thing {
  @ApiProperty()
  @AutoMap()
  title!: string;

  @ApiProperty()
  @AutoMap()
  quantity!: number;

  @ApiProperty()
  @AutoMap()
  amount!: number;

  @ApiProperty()
  @AutoMap()
  orderData!: Inventory;

  @ApiPropertyOptional()
  @AutoMap()
  discountData?: Discount;
}
