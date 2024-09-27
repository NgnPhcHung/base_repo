import { Injectable } from '@nestjs/common';
import { LocationQueryParams } from '@packages/models';
import { DistrictService } from './district.service';
import { ProvinceService } from './province.service';
import { WardService } from './ward.service';

@Injectable()
export class LocationService {
  constructor(
    private districtService: DistrictService,
    private wardService: WardService,
    private provinceService: ProvinceService,
  ) {}

  async getListDistrict({
    limit,
    sortBy,
    sortDirection,
    cursor,
  }: LocationQueryParams) {
    return this.districtService.findAndCount({
      cursor: cursor,
      take: limit,
      order: {
        [sortBy]: sortDirection,
      },
    });
  }

  async getListWard({
    limit,
    sortBy,
    sortDirection,
    cursor,
  }: LocationQueryParams) {
    return this.wardService.findAndCount({
      cursor: cursor,
      take: limit,
      order: {
        [sortBy]: sortDirection,
      },
    });
  }

  async getListProvince({
    limit,
    sortBy,
    sortDirection,
    cursor,
  }: LocationQueryParams) {
    return await this.provinceService?.findAndCount({
      cursor: cursor,
      take: limit,
      order: {
        [sortBy]: sortDirection,
      },
    });
  }
}
