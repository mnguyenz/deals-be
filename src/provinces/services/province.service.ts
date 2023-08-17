import { Injectable } from '@nestjs/common';
import { ProvinceRepository } from '~provinces/province.repository';

@Injectable()
export class ProvinceService {
  constructor(private provinceRepo: ProvinceRepository) {}
}
