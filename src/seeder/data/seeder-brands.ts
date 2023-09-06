import { readFileSync } from 'fs';
import csvtojson from 'csvtojson';
import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { BrandEntity } from '~entities/brand.entity';

export default class SeederBrands implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const brandRepo = dataSource.getRepository(BrandEntity);
    const brandFilepath = 'src/seeder/data/brands.csv';
    try {
      if (readFileSync(brandFilepath)) {
        const listBrands: BrandEntity[] = [];
        const array = await csvtojson().fromFile(brandFilepath);
        listBrands.push(...array);
        for (const brand of listBrands) {
          await brandRepo.insert(brand);
        }
      }
    } catch (err) {}
  }
}
