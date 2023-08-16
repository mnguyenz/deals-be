import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/provinces')
@ApiTags('provinces')
export class ProvinceController {
  constructor() {}
}
