import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceEntity } from '~entities/province.entity';

@Injectable()
export class ProvinceRepository extends Repository<ProvinceEntity> {
  constructor(
    @InjectRepository(ProvinceEntity)
    private provinceRepository: Repository<ProvinceEntity>,
  ) {
    super(
      provinceRepository.target,
      provinceRepository.manager,
      provinceRepository.queryRunner,
    );
  }
}
