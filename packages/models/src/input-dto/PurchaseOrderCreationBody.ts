import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Discount } from "../dto/Discount";
import { PurchaseOrderItemCreationBody } from "./PurchaseOrderItemCreationBody";

export class PurchaseOrderCreationBody {
  @ApiProperty()
  @AutoMap()
  orderItems!: PurchaseOrderItemCreationBody[];

  @ApiProperty()
  @AutoMap()
  buyer!: number
  
  @ApiProperty()
  @AutoMap()
  seller!: number

  @ApiPropertyOptional()
  @AutoMap()
  discount?: Discount;

  @ApiProperty()
  @AutoMap()
  total!: number;
}
