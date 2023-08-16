import { Injectable } from '@nestjs/common';
import { csvProvinceType } from '~common/types/provinces.type';
import removeVietnameseTones from '~core/helpers/remove-vietnamese-tones';
import { ProvinceEntity } from '~entities/province.entity';
import { ProvinceRepository } from '~provinces/province.repository';

@Injectable()
export class ProvinceService {
  constructor(private provinceRepo: ProvinceRepository) {}

  async seedProvince(seedProvincesData: csvProvinceType[]): Promise<void> {
    try {
      console.log('Minh 1');
      const saveToDB = [];
      seedProvincesData.forEach((province: csvProvinceType) => {
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
        withoutAccentsCapitalizeName =
          removeVietnameseTones(vietCapitalizeName);
        vietCapitalizePrefix = vietPrefix.toUpperCase();
        withoutAccentsPrefix = removeVietnameseTones(vietPrefix);
        withoutAccentsCapitalizePrefix =
          removeVietnameseTones(vietCapitalizePrefix);
        const newProvince = {
          code: province.code,
          vietName,
          vietCapitalizeName,
          withoutAccentsName,
          withoutAccentsCapitalizeName,
          vietPrefix,
          vietCapitalizePrefix,
          withoutAccentsPrefix,
          withoutAccentsCapitalizePrefix,
        } as ProvinceEntity;
        console.log(newProvince);
        saveToDB.push(
          this.provinceRepo.upsert(newProvince, [
            'code',
            'vietName',
            'vietPrefix',
          ]),
        );
      });
      await Promise.all(saveToDB);
    } catch (err) {}
  }
}
