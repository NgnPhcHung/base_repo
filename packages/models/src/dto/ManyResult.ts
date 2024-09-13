import { ApiProperty } from "@nestjs/swagger";

export interface IManyResult<Resource> {
  data: Resource[];
  total: number;
}

export class ManyResult<T> implements IManyResult<T> {
  @ApiProperty({ type: () => [Object] as any, isArray: true }) 
  data: T[];

  @ApiProperty({ example: 100, description: "Total number of items" })
  total: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.total = total;
  }
}
