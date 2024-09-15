import { ApiProperty } from "@nestjs/swagger";
import { IPaginationResult } from "./IPaginationResult";
import { ManyResult } from "./ManyResult";

export class PaginationResult<T>
  extends ManyResult<T>
  implements IPaginationResult<T>
{
  @ApiProperty({ example: 1, description: "Current page number" })
  page: number;

  @ApiProperty({ example: 10, description: "Number of items per page" })
  limit: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    super(data, total);
    this.page = page;
    this.limit = limit;
  }
}
