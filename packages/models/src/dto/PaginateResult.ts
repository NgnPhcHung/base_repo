import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IPaginationResult } from "./IPaginationResult";
import { Pageable } from "./Pageable";

export class PaginationResult<T>
  extends Pageable
  implements IPaginationResult<T>
{
  @ApiProperty()
  @AutoMap()
  data!: T[];

  @ApiProperty()
  @AutoMap()
  total: number = 0;

  constructor(data: T[], total: number, pageable: Pageable) {
    super(pageable);
    this.data = data;
    this.total = total;
  }
}
