import { Read } from '@decorators';
import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  District,
  LocationQueryParams,
  PaginationResult,
  Province,
  Ward,
} from '@packages/models';
import { LocationService } from './location.service';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Read('/districts', {
    inputDto: LocationQueryParams,
    dto: PaginationResult<District>,
  })
  async getListDistrict(@Query() query: LocationQueryParams) {
    const { data, count } = await this.locationService.getListDistrict(query);

    return new PaginationResult(data, count, query);
  }

  @Read('/provinces', {
    inputDto: LocationQueryParams,
    dto: PaginationResult<Province>,
  })
  async getListProvince(@Query() query: LocationQueryParams) {
    const { data, count } = await this.locationService.getListProvince(query);

    return new PaginationResult(data, count, query);
  }

  @Read('/wards', {
    inputDto: LocationQueryParams,
    dto: PaginationResult<Ward>,
  })
  async getListWard(@Query() query: LocationQueryParams) {
    const { data, count } = await this.locationService.getListWard(query);

    return new PaginationResult(data, count, query);
  }
}
