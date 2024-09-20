import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { User } from "./User";

export class Friendship extends Thing {
  @ApiProperty()
  @AutoMap()
  initiator!: number;

  @ApiProperty()
  @AutoMap()
  friend!: number;
}
