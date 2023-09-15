import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { FlyerEntity } from '~entities/flyer.entity';
import { CreateFlyerDto } from '~flyers/dto/create-flyer.dto';
import { FlyerService } from '~flyers/services/flyer.service';

@Controller('api/flyers')
@ApiTags('flyers')
export class FlyerController {
  constructor(private flyerSerivce: FlyerService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createFlyerDto: CreateFlyerDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: `^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$`,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<FlyerEntity> {
    return this.flyerSerivce.createFlyer(createFlyerDto, files);
  }

  @Get()
  getAll(): Promise<FlyerEntity[]> {
    return this.flyerSerivce.getAll();
  }
}
