import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '~core/base.entity';
import { DistrictEntity } from './district.entity';
import { AddressEntity } from './address.entity';

@Entity('Provinces')
export class ProvinceEntity extends Base {
  @Column({
    type: 'int',
    unique: true,
  })
  code: number;

  @Column({
    type: 'varchar',
  })
  fullName: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  prefix: string;

  @OneToMany(() => DistrictEntity, (district) => district.province, {
    nullable: true,
  })
  districts: DistrictEntity[];

  @OneToMany(() => AddressEntity, (address) => address.province, {
    nullable: true,
  })
  addresses: AddressEntity[];
}
