import { Module } from '@nestjs/common';
import { SeederController } from './controllers/seeder.controller';
import { ExportProvincesService } from './services/export-provinces.service';
import { ProvinceModule } from '~provinces/province.module';
import { ExportDistrictsService } from './services/export-districts.service';

@Module({
  imports: [ProvinceModule],
  controllers: [SeederController],
  providers: [ExportProvincesService, ExportDistrictsService],
})
export class SeederModule {}
