import { Module } from '@nestjs/common';
import { ProvinceController } from './controllers/province.controller';
import { ProvinceService } from './services/province.service';

@Module({
  imports: [],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
