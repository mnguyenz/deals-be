import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '~core/base.entity';
import { BrandEntity } from './brand.entity';
import { SinglePageInFlyers } from '~common/types/single-page-in-flyers.type';

@Entity('Flyers')
export class FlyerEntity extends Base {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
    default: () => `CURRENT_TIMESTAMP + INTERVAL '7 days'`,
  })
  endDate: Date;

  @Column({
    name: 'pages',
    type: 'jsonb',
    nullable: true,
  })
  pages: Array<SinglePageInFlyers>;

  @ManyToOne(() => BrandEntity, (brand) => brand.flyers)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @Column({
    type: 'int',
    nullable: true,
  })
  brandId: number;
}
