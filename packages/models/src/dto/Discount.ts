import { ApiProperty } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { DiscountApplyType, DiscountType } from "../consts";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
import { Order } from "./Order";

export class Discount extends Thing {
  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiProperty({ nullable: true })
  @AutoMap()
  description?: string;

  @ApiProperty({})
  @AutoMap()
  discountType!: DiscountType;

  @ApiProperty({ type: "date" })
  @AutoMap()
  startDate!: Date;

  @ApiProperty({ type: "date" })
  @AutoMap()
  endDate!: Date;

  @ApiProperty({ type: "bool", default: false, nullable: true })
  @AutoMap()
  isActive?: boolean;

  @ApiProperty({ type: "int" })
  @AutoMap()
  maxUses!: number;

  @ApiProperty({ type: "int", default: 0 })
  @AutoMap()
  usesCount!: number;

  @ApiProperty()
  @AutoMap()
  usersUsed!: User[];

  @ApiProperty({ type: "int" })
  @AutoMap()
  maxUsedPerUser!: number;

  @ApiProperty({ type: "int" })
  @AutoMap()
  minOrderValue!: number;

  @ApiProperty({})
  @AutoMap()
  applyType!: DiscountApplyType;

  @ApiProperty({})
  @AutoMap()
  discountItems?: OrderItem[];

  @ApiProperty({})
  @AutoMap()
  discountOrders?: Order[];
}
