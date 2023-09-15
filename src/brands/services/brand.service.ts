import { Injectable } from '@nestjs/common';
import { BrandRepository } from '~brands/brand.repository';
import { BaseService } from '~core/base.service';
import { BrandEntity } from '~entities/brand.entity';

@Injectable()
export class BrandService extends BaseService<BrandEntity> {
  constructor(private brandRepository: BrandRepository) {
    super(brandRepository);
  }
}
