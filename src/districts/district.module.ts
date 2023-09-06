import { Module } from '@nestjs/common';
import { DistrictController } from './controllers/district.controller';
import { DistrictService } from './services/district.service';
import { DistrictRepository } from './district.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity } from '~entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity])],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictRepository],
  exports: [DistrictService],
})
export class DistrictModule {}
