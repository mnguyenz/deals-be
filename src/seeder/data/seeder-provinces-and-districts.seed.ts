import { readFileSync } from 'fs';
import csvtojson from 'csvtojson';
import { Factory, Seeder } from 'typeorm-seeding';
import { csvProvinceType } from '~common/types/provinces.type';
import removeVietnameseTones from '~core/helpers/remove-vietnamese-tones';
import { DataSource } from 'typeorm';
import { ProvinceEntity } from '~entities/province.entity';
import { DistrictEntity } from '~entities/district.entity';
import { csvDistrictType } from '~common/types/districts.type';

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
    let vietName = '';
    let vietCapitalizeName = '';
    let withoutAccentsName = '';
    let withoutAccentsCapitalizeName = '';
    let vietPrefix = '';
    let vietCapitalizePrefix = '';
    let withoutAccentsPrefix = '';
    let withoutAccentsCapitalizePrefix = '';

    if (province.name.toUpperCase().includes('TỈNH')) {
      vietName = province.name.slice(5);
      vietPrefix = 'Tỉnh';
    } else {
      vietName = province.name.slice(10);
      vietPrefix = 'Thành Phố';
    }
    vietCapitalizeName = vietName.toUpperCase();
    withoutAccentsName = removeVietnameseTones(vietName);
    withoutAccentsCapitalizeName = removeVietnameseTones(vietCapitalizeName);
    vietCapitalizePrefix = vietPrefix.toUpperCase();
    withoutAccentsPrefix = removeVietnameseTones(vietPrefix);
    withoutAccentsCapitalizePrefix =
      removeVietnameseTones(vietCapitalizePrefix);
    return {
      code: +province.code,
      vietName,
      vietCapitalizeName,
      withoutAccentsName,
      withoutAccentsCapitalizeName,
      vietPrefix,
      vietCapitalizePrefix,
      withoutAccentsPrefix,
      withoutAccentsCapitalizePrefix,
    };
  }

  private async mapDistrictData(
    district: csvDistrictType,
  ): Promise<Partial<DistrictEntity>> {
    let vietName = '';
    let vietCapitalizeName = '';
    let withoutAccentsName = '';
    let withoutAccentsCapitalizeName = '';
    let vietPrefix = '';
    let vietCapitalizePrefix = '';
    let withoutAccentsPrefix = '';
    let withoutAccentsCapitalizePrefix = '';

    if (!/\d/.test(district.name)) {
      if (district.name.toUpperCase().includes('QUẬN'.toUpperCase())) {
        vietName = district.name.slice(5);
        vietPrefix = 'Quận';
      } else if (district.name.toUpperCase().includes('HUYỆN'.toUpperCase())) {
        vietName = district.name.slice(6);
        vietPrefix = 'Huyện';
      } else if (district.name.toUpperCase().includes('THỊ XÃ'.toUpperCase())) {
        vietName = district.name.slice(7);
        vietPrefix = 'Thị Xã';
      } else if (
        district.name.toUpperCase().includes('THÀNH PHỐ'.toUpperCase())
      ) {
        vietName = district.name.slice(10);
        vietPrefix = 'Thành Phố';
      }
    } else {
      vietName = district.name;
      vietPrefix = 'Quận';
    }
    vietCapitalizeName = vietName.toUpperCase();
    withoutAccentsName = removeVietnameseTones(vietName);
    withoutAccentsCapitalizeName = removeVietnameseTones(vietCapitalizeName);
    vietCapitalizePrefix = vietPrefix.toUpperCase();
    withoutAccentsPrefix = removeVietnameseTones(vietPrefix);
    withoutAccentsCapitalizePrefix =
      removeVietnameseTones(vietCapitalizePrefix);

    return {
      code: +district.code,
      vietName,
      vietCapitalizeName,
      withoutAccentsName,
      withoutAccentsCapitalizeName,
      vietPrefix,
      vietCapitalizePrefix,
      withoutAccentsPrefix,
      withoutAccentsCapitalizePrefix,
    };
  }
}
