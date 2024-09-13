import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../consts";

export class UserCreationBody {
  @AutoMap()
  @ApiProperty({ default: "John" })
  firstName!: string;

  @AutoMap()
  @ApiProperty({ default: "Doe" })
  lastName!: string;

  @AutoMap()
  @ApiProperty()
  username!: string;

  @AutoMap()
  @ApiProperty({ default: "Bidding@123" })
  password!: string;

  @AutoMap()
  @ApiProperty()
  role!: UserRole;
}
