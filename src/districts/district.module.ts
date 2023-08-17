import { Module } from '@nestjs/common';
import { DistrictController } from './controllers/district.controller';
import { DistrictService } from './services/district.service';

@Module({
  imports: [],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule {}
