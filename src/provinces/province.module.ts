import { Module } from '@nestjs/common';
import { ProvinceController } from './controllers/province.controller';
import { ProvinceService } from './services/province.service';
import { ProvinceRepository } from './province.repository';

@Module({
  imports: [],
  controllers: [ProvinceController],
  providers: [ProvinceRepository, ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
