import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from '~brands/services/brand.service';

@Controller('api/brands')
@ApiTags('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}
}
