import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandEntity } from '~entities/brand.entity';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {
    super(
      brandRepository.target,
      brandRepository.manager,
      brandRepository.queryRunner,
    );
  }
}
