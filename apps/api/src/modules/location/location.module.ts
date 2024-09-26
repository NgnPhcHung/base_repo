import { DistrictEntity, ProvinceEntity, WardEntity } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceService } from './province.service';
import { WardService } from './ward.service';
import { LocationController } from './location.controller';
import { DistrictService } from './district.service';
import { LocationService } from './location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DistrictEntity, ProvinceEntity, WardEntity]),
  ],
  providers: [WardService, ProvinceService, DistrictService, LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
