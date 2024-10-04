import { Read } from '@decorators';
import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  District,
  LocationQueryParams,
  PaginationResult,
  Province,
  ProvinceFilterParam,
  Ward,
} from '@packages/models';
import { LocationService } from './location.service';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Read('/districts', {
    dto: PaginationResult<District>,
  })
  async getListDistrict(@Query() query: LocationQueryParams) {
    const { data, count } = await this.locationService.getListDistrict(query);

    return new PaginationResult(data, count, query);
  }

  @Read('/provinces', {
    dto: Province,
  })
  async getListProvince(@Query() query: ProvinceFilterParam) {
    const { data, count } = await this.locationService.getListProvince(query);

    return new PaginationResult(data, count, query);
  }

  @Read('/wards', {
    dto: Ward,
  })
  async getListWard(@Query() query: LocationQueryParams) {
    const { data, count } = await this.locationService.getListWard(query);

    return new PaginationResult(data, count, query);
  }
}
