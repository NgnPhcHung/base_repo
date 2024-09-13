import { ApiProperty } from "@nestjs/swagger";
import { IManyResult, ManyResult } from "./ManyResult";

export interface IPaginationResult<Resource> extends IManyResult<Resource> {
  page: number;
  limit: number;
}

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
