import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Discount } from "../dto/Discount";
import { MarketItemCreationBody } from "./MarketItemCreationBody";

export class MarketCreationBody {
  @ApiProperty()
  @AutoMap()
  orderItems!: MarketItemCreationBody[];

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
