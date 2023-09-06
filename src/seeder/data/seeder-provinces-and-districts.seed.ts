import { readFileSync } from 'fs';
import csvtojson from 'csvtojson';
import { Factory, Seeder } from 'typeorm-seeding';
import { csvProvinceType } from '~common/types/provinces.type';
import removeVietnameseTones from '~core/helpers/remove-vietnamese-tones';
import { DataSource } from 'typeorm';
import { ProvinceEntity } from '~entities/province.entity';
import { DistrictEntity } from '~entities/district.entity';
import { csvDistrictType } from '~common/types/districts.type';
import { ProvinceType } from '~common/enums/provinces.enum';
import { DistrictType } from '~common/enums/districts.enum';

export default class SeederProvincesAndDistricts implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const listProvinceEntities: ProvinceEntity[] = [];
    const provinceRepo = dataSource.getRepository(ProvinceEntity);
    const provinceFilepath = 'src/seeder/data/provinces.csv';
    try {
      if (readFileSync(provinceFilepath)) {
        const listProvinces: csvProvinceType[] = [];
        const array = await csvtojson().fromFile(provinceFilepath);
        listProvinces.push(...array);
        for (const province of listProvinces) {
          const provinceMapped = await this.mapProvinceData(province);
          const provinceEntity = await provinceRepo.save(provinceMapped);
          listProvinceEntities.push(provinceEntity);
        }
      }

      const districtRepo = dataSource.getRepository(DistrictEntity);
      const districtFilepath = 'src/seeder/data/districts.csv';
      if (readFileSync(districtFilepath)) {
        const listDistricts: csvDistrictType[] = [];
        const array = await csvtojson().fromFile(districtFilepath);
        listDistricts.push(...array);
        for (const district of listDistricts) {
          const districtEntity = await this.mapDistrictData(district);
          const province = listProvinceEntities.find((province) => {
            return province.code === +district.province_code;
          });
          districtEntity.province = province;
          districtEntity.provinceId = province.id;
          await districtRepo.insert(districtEntity);
        }
      }
    } catch (err) {}
  }

  private async mapProvinceData(
    province: csvProvinceType,
  ): Promise<Partial<ProvinceEntity>> {
    let name = '';
    let prefix = '';

    if (province.name.includes(ProvinceType.TINH)) {
      name = province.name.slice(5);
      prefix = ProvinceType.TINH;
    } else {
      name = province.name.slice(10);
      prefix = ProvinceType.THANH_PHO;
    }
    return {
      code: +province.code,
      fullName: province.name,
      name,
      prefix,
    };
  }

  private async mapDistrictData(
    district: csvDistrictType,
  ): Promise<Partial<DistrictEntity>> {
    let name = '';
    let prefix = '';

    if (!/\d/.test(district.name)) {
      if (district.name.includes(DistrictType.QUAN)) {
        name = district.name.slice(5);
        prefix = DistrictType.QUAN;
      } else if (district.name.includes(DistrictType.HUYEN)) {
        name = district.name.slice(6);
        prefix = DistrictType.HUYEN;
      } else if (district.name.includes(DistrictType.THI_XA)) {
        name = district.name.slice(7);
        prefix = DistrictType.THI_XA;
      } else if (district.name.includes(DistrictType.THANH_PHO)) {
        name = district.name.slice(10);
        prefix = DistrictType.THANH_PHO;
      }
    } else {
      name = district.name;
      prefix = DistrictType.QUAN;
    }

    return {
      code: +district.code,
      fullName: district.name,
      name,
      prefix,
    };
  }
}
