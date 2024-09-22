import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { FriendRequestStatus } from "../consts";

export class FriendRequestUpdatingBody {
  @AutoMap()
  @ApiProperty()
  requestId!: number
  
  @AutoMap()
  @ApiProperty()
  senderId!: number;

  @AutoMap()
  @ApiProperty()
  receiverId!: number;

  @AutoMap()
  @ApiProperty({ enum: FriendRequestStatus })
  status!: FriendRequestStatus;
}
