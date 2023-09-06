import { Module } from '@nestjs/common';
import { ProvinceController } from './controllers/province.controller';
import { ProvinceService } from './services/province.service';
import { ProvinceRepository } from './province.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceEntity } from '~entities/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceEntity])],
  controllers: [ProvinceController],
  providers: [ProvinceRepository, ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
