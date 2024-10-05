import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Discount } from "../dto";

export class PurchaseOrderItemCreationBody {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  quantity!: number;

  @ApiPropertyOptional()
  discount?: Discount;
}
