import { readFileSync } from 'fs';
import csvtojson from 'csvtojson';
import { Factory, Seeder } from 'typeorm-seeding';
import { csvProvinceType } from '~common/types/provinces.type';
import removeVietnameseTones from '~core/helpers/remove-vietnamese-tones';
import { DataSource } from 'typeorm';
import { ProvinceEntity } from '~entities/province.entity';

export default class SeederProvinces implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ProvinceEntity);
    const filepath = 'src/seeder/data/provinces.csv';
    try {
      if (readFileSync(filepath)) {
        const listProvinces: csvProvinceType[] = [];
        const array = await csvtojson().fromFile(filepath);
        listProvinces.push(...array);
        for (const province of listProvinces) {
          const provinceEntity = await this.mapProvinceData(province);
          await repository.insert(provinceEntity);
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
}
