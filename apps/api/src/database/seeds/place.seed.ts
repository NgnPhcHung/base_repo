import { DistrictEntity, ProvinceEntity, WardEntity } from '@entities';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class PlaceSeeder implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const provinceRepository = dataSource.getRepository(ProvinceEntity);
    const districtRepository = dataSource.getRepository(DistrictEntity);
    const wardRepository = dataSource.getRepository(WardEntity);

    console.log('Seeding Places');

    const data = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../../seed-data/placeData.json'),
        'utf8',
      ),
    );

    for (const provinceData of data) {
      const province = provinceRepository.create({
        name: provinceData.Name,
        code: provinceData.Code,
      });
      const existingProvince = provinceRepository.findOneBy({
        name: provinceData.Name,
      });
      // if (!existingProvince) {
        await provinceRepository.save(province);
      // }

      for (const districtData of provinceData.District) {
        const district = districtRepository.create({
          name: districtData.Name,
          code: districtData.Code,
          province: province,
        });
        const existingDistrict = districtRepository.findOneBy({
          name: districtData.Name,
        });
        // if (!existingDistrict) {
          await districtRepository.save(district);
        // }

        for (const wardData of districtData.Ward) {
          const ward = wardRepository.create({
            name: wardData.Name,
            code: wardData.Code,
            district: district,
          });

          // const existingWard = wardRepository.findOneBy({
          //   name: wardData.Name,
          // });
          // if (!existingWard) {
            await wardRepository.save(ward);
          // }
        }
      }
    }
    console.log('All places have been processed.');
  }
}
