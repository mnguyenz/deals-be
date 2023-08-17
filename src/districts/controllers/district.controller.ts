import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/districts')
@ApiTags('districts')
export class DistrictController {
  constructor() {}
}
