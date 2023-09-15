import { Injectable } from '@nestjs/common';
import { BaseService } from '~core/base.service';
import { FlyerEntity } from '~entities/flyer.entity';
import { CreateFlyerDto } from '~flyers/dto/create-flyer.dto';
import { FlyerRepository } from '~flyers/flyer.repository';
import { forEach } from 'lodash';
import * as pdf2img from 'pdf-img-convert';
import { BrandService } from '~brands/services/brand.service';
import { uploadFlyer } from '~core/helpers/upload-image';
import { S3Service } from '~s3/s3.service';
import { BrandEntity } from '~entities/brand.entity';

@Injectable()
export class FlyerService extends BaseService<FlyerEntity> {
  constructor(
    private flyerRepository: FlyerRepository,
    private brandService: BrandService,
    private s3Service: S3Service,
  ) {
    super(flyerRepository);
  }

  async convertPdfToImage(file: Express.Multer.File): Promise<Buffer[]> {
    try {
      const pngPages = await pdf2img.convert(file.buffer, {
        scale: 1.8,
      });
      return pngPages.map((page) => Buffer.from(page));
    } catch (error) {
      throw new Error('Failed to convert PDF to image');
    }
  }

  async createFlyer(
    createFlyerDto: CreateFlyerDto,
    files: Express.Multer.File[],
  ): Promise<FlyerEntity> {
    const images: Buffer[] = [];
    files.map(async (file) => {
      const { mimetype } = file;
      if (mimetype.includes('image')) {
        images.push(file.buffer);
      }
      if (mimetype.includes('pdf')) {
        forEach(await this.convertPdfToImage(file), (imageBuffer: Buffer) => {
          images.push(imageBuffer);
        });
      }
    });
    const { startDate, endDate, brandId } = createFlyerDto;
    let startDateObj = startDate;
    if (startDate) {
      startDateObj = new Date(startDate);
      startDateObj.setHours(0, 0, 0);
    }
    let endDateObj = endDate;
    if (endDate) {
      endDateObj = new Date(endDate);
      endDateObj.setHours(23, 59, 59);
    }
    let foundBrand: BrandEntity;
    if (brandId) {
      foundBrand = await this.brandService.findOne({ where: { id: +brandId } });
    }
    const flyerName = `${
      foundBrand?.code || 'NoBrand'
    }/${startDate}-${endDate}`;
    const pages = uploadFlyer(images, this.s3Service, flyerName);
    return await this.flyerRepository.save({
      startDate: startDateObj,
      endDate: endDateObj,
      pages,
      brand: foundBrand,
    });
  }

  getAll(): Promise<FlyerEntity[]> {
    return this.find();
  }
}
