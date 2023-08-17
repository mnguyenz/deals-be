import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~core/base.repository';
import { DistrictEntity } from '~entities/district.entity';

@Injectable()
export class DistrictRepository extends BaseRepository<DistrictEntity> {}
