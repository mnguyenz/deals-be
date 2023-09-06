import { Injectable } from '@nestjs/common';
import { BaseService } from '~core/base.service';
import { ProvinceEntity } from '~entities/province.entity';
import { ProvinceRepository } from '~provinces/province.repository';

@Injectable()
export class ProvinceService extends BaseService<ProvinceEntity> {
  constructor(private provinceRepository: ProvinceRepository) {
    super(provinceRepository);
  }

  getAll(): Promise<ProvinceEntity[]> {
    return this.find();
  }
}
