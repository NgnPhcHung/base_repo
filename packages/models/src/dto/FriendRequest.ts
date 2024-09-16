import { AutoMap } from "@automapper/classes";
import { Thing } from "./Thing";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User";
import { FriendRequestStatus } from "../consts";

export class FriendRequest extends Thing{
    @ApiProperty()
    @AutoMap()
    sender!: User

    @ApiProperty()
    @AutoMap()
    receiver!: User

    @ApiProperty({ enum: FriendRequestStatus })
    @AutoMap()
    status!: FriendRequestStatus
}