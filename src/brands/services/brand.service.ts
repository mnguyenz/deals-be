import { Injectable } from '@nestjs/common';
import { BrandRepository } from '~brands/brand.repository';

@Injectable()
export class BrandService {
  constructor(private brandRepo: BrandRepository) {}
}
