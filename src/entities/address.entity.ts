import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '~core/base.entity';
import { DistrictEntity } from './district.entity';
import { ProvinceEntity } from './province.entity';

@Entity('Addresses')
export class AddressEntity extends Base {
  @Column({
    type: 'text',
    nullable: true,
  })
  raw: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  street: string;

  @ManyToOne(() => ProvinceEntity, { nullable: true })
  @JoinColumn()
  province: ProvinceEntity;

  @Column({
    type: 'int',
    nullable: true,
  })
  provinceId: number;

  @ManyToOne(() => DistrictEntity, { nullable: true })
  @JoinColumn()
  district: DistrictEntity;

  @Column({
    type: 'int',
    nullable: true,
  })
  districtId: number;
}
