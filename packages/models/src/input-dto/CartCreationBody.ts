import { ApiProperty } from "@nestjs/swagger";

export class CartCreationBody {
  @ApiProperty()
  seller!: number;

  @ApiProperty()
  buyer!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  itemId!: number;
}
