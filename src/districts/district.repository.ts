import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictEntity } from '~entities/district.entity';

@Injectable()
export class DistrictRepository extends Repository<DistrictEntity> {
  constructor(
    @InjectRepository(DistrictEntity)
    private districtRepository: Repository<DistrictEntity>,
  ) {
    super(
      districtRepository.target,
      districtRepository.manager,
      districtRepository.queryRunner,
    );
  }
}
