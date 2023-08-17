import { Injectable } from '@nestjs/common';
import { DistrictRepository } from '~districts/district.repository';

@Injectable()
export class DistrictService {
  constructor(private districtRepo: DistrictRepository) {}
}
