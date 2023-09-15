import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlyerEntity } from '~entities/flyer.entity';

@Injectable()
export class FlyerRepository extends Repository<FlyerEntity> {
  constructor(
    @InjectRepository(FlyerEntity)
    private flyerRepository: Repository<FlyerEntity>,
  ) {
    super(
      flyerRepository.target,
      flyerRepository.manager,
      flyerRepository.queryRunner,
    );
  }
}
