import { ApiProperty } from "@nestjs/swagger";
import { OrderItem } from "../dto/OrderItem";
import { Discount } from "../dto/Discount";

export class PurchaseOrderCreationBody {
  @ApiProperty()
  orderItems!: OrderItem[];

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  discount!: Discount

  @ApiProperty()
  total!: number
}
