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
    skip,
    limit,
    sortBy,
    sortDirection,
  }: LocationQueryParams) {
    return this.districtService.findAndCount({
      skip: skip,
      take: limit,
      order: {
        [sortBy]: sortDirection,
      },
    });
  }

  async getListWard({
    skip,
    limit,
    sortBy,
    sortDirection,
  }: LocationQueryParams) {
    return this.wardService.findAndCount({
      skip: skip,
      take: limit,
      order: {
        [sortBy]: sortDirection,
      },
    });
  }

  async getListProvince({
    skip,
    limit,
    sortBy,
    sortDirection,
  }: LocationQueryParams) {

    return await this.provinceService?.findAndCount({
      skip: skip,
      take: limit,
      order: {
        [sortBy]: sortDirection,
      },
    });
  }
}
