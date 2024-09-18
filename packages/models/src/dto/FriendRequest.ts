import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { FriendRequestStatus } from "../consts";
import { Thing } from "./Thing";
import { User } from "./User";

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