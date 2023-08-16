import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExportProvincesService } from '~seeder/services/export-provinces.service';

@Controller('seeder')
@ApiTags('seeder')
export class SeederController {
  constructor(private exportProvincesService: ExportProvincesService) {}

  @Get('1-seed-province-and-district')
  seedProvinceAndDistrict(): Promise<string> {
    return this.exportProvincesService.seedProvince();
  }
}
