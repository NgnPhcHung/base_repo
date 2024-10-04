import { ApiProperty } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { Discount } from "./Discount";

export class OrderItem extends Thing {
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
  discount?: Discount;
}
