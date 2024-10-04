import { ApiProperty } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { AutoMap } from "@automapper/classes";
import { OrderStatus } from "../consts";
import { User } from "./User";

export class Order extends Thing{
    @ApiProperty()
    @AutoMap()
    title!: string

    @ApiProperty()
    @AutoMap()
    status!: OrderStatus

    @ApiProperty()
    @AutoMap()
    orderDate!: Date

    @ApiProperty()
    @AutoMap()
    total!: number

    @ApiProperty()
    @AutoMap()
    buyer!: User

    @ApiProperty()
    @AutoMap()
    seller!: User
}