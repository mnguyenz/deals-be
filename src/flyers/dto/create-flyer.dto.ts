import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFlyerDto {
  @ApiProperty({
    example: new Date(),
  })
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: new Date(),
  })
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  brandId: string;

  @ApiProperty({
    example: ['1', '2', '3'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  storeIds: string[];
}
