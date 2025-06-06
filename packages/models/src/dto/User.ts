import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Thing } from "./Thing";
import { UserRole } from "../consts";

export class User extends Thing {
  @ApiProperty({ required: true })
  @AutoMap()
  username!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  @AutoMap()
  firstName!: string;

  @ApiProperty()
  @AutoMap()
  lastName!: string;


  @ApiPropertyOptional()
  @AutoMap()
  fullName?: string;

  @ApiProperty({ enum: UserRole })
  @AutoMap()
  role!: UserRole;
}
