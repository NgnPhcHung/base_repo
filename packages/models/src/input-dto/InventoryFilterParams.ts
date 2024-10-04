import { ApiProperty } from "@nestjs/swagger";
import { InventoryStatus } from "../consts";
import { Pageable } from "../dto";

export class InventoryFilterParams extends Pageable {
  @ApiProperty()
  categoryId?: number;

  @ApiProperty({ type: "enum", enum: InventoryStatus })
  status?: string;
}
