import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { OrderStatus } from "../consts";
import { User } from "./User";
import { Discount } from "./Discount";

export class Order extends Thing {
  @ApiProperty()
  @AutoMap()
  title!: string;

  @ApiProperty()
  @AutoMap()
  status!: OrderStatus;

  @ApiProperty()
  @AutoMap()
  orderDate!: Date;

  @ApiProperty()
  @AutoMap()
  total!: number;

  @ApiProperty()
  @AutoMap()
  buyer!: User;

  @ApiProperty()
  @AutoMap()
  seller!: User;

  @ApiPropertyOptional()
  @AutoMap()
  discountData?: Discount;
}
