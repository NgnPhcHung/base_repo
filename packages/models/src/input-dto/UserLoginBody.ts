import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginBody {
  @AutoMap()
  @ApiProperty()
  username!: string;

  @ApiProperty()
  password!: string;
}
