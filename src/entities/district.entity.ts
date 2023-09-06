import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '~core/base.entity';
import { ProvinceEntity } from './province.entity';
import { AddressEntity } from './address.entity';

@Entity('Districts')
export class DistrictEntity extends Base {
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

  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  @JoinColumn({ name: 'provinceId' })
  province: ProvinceEntity;

  @Column({
    type: 'int',
  })
  provinceId: number;

  @OneToMany(() => AddressEntity, (address) => address.district, {
    nullable: true,
  })
  addresses: AddressEntity[];
}
