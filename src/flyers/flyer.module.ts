import { Module } from '@nestjs/common';
import { FlyerController } from './controllers/flyer.controller';
import { FlyerService } from './services/flyer.service';
import { FlyerRepository } from './flyer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlyerEntity } from '~entities/flyer.entity';
import { BrandModule } from '~brands/brand.module';
import { S3Module } from '~s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([FlyerEntity]), BrandModule, S3Module],
  controllers: [FlyerController],
  providers: [FlyerRepository, FlyerService],
  exports: [FlyerService],
})
export class FlyerModule {}
