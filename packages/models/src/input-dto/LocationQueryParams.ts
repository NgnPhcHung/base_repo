import { ApiProperty } from "@nestjs/swagger";
import { Pageable } from "../dto/Pageable";

export class LocationQueryParams extends Pageable {
    @ApiProperty()
    provinceId?: number

    @ApiProperty()
    wardId?: number

    @ApiProperty()
    districtId?: number

    @ApiProperty()
    provinceName?: string
    
    @ApiProperty()
    wardName?: string
    
    @ApiProperty()
    districtName?: string

}