import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExportDistrictsService } from '~seeder/services/export-districts.service';
import { ExportProvincesService } from '~seeder/services/export-provinces.service';

@Controller('seeder')
@ApiTags('seeder')
export class SeederController {
  constructor(
    private exportProvincesService: ExportProvincesService,
    private dxportDistrictsService: ExportDistrictsService,
  ) {}

  @Get('export-provinces')
  exportProvinces(): Promise<string> {
    return this.exportProvincesService.exportProvinces();
  }

  @Get('export-districts')
  exportDistricts(): Promise<string> {
    return this.dxportDistrictsService.exportDistricts();
  }
}
