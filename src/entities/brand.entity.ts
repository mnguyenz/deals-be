import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '~core/base.entity';
import { FlyerEntity } from './flyer.entity';

@Entity('Brands')
export class BrandEntity extends Base {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  @Column({
    nullable: true,
  })
  logoAwsLink: string;

  @OneToMany(() => FlyerEntity, (flyer) => flyer.brand)
  flyers: FlyerEntity[];
}
