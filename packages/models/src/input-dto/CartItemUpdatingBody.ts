import { ApiProperty } from "@nestjs/swagger";

export class CartItemUpdatingBody {
  @ApiProperty()
  quantity!: number;
}
