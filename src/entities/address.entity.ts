import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '~core/base-repository/base.entity';
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

  @ManyToOne(() => ProvinceEntity, (province) => province.addresses)
  @JoinColumn({ name: 'provinceId' })
  province: ProvinceEntity;

  @ManyToOne(() => DistrictEntity, (district) => district.addresses)
  @JoinColumn({ name: 'districtId' })
  district: DistrictEntity;
}
