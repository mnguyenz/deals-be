import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~core/base.repository';
import { ProvinceEntity } from '~entities/province.entity';

@Injectable()
export class ProvinceRepository extends BaseRepository<ProvinceEntity> {}
