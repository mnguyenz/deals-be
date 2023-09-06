import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProvinceEntity } from '~entities/province.entity';
import { ProvinceService } from '~provinces/services/province.service';

@Controller('api/provinces')
@ApiTags('provinces')
export class ProvinceController {
  constructor(private provinceSerivce: ProvinceService) {}

  @Get()
  getAll(): Promise<ProvinceEntity[]> {
    return this.provinceSerivce.getAll();
  }
}
