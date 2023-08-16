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
    nullable: false,
  })
  vietName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  vietCapitalizeName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  withoutAccentsName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  withoutAccentsCapitalizeName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  vietPrefix: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  vietCapitalizePrefix: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  withoutAccentsPrefix: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  withoutAccentsCapitalizePrefix: string;

  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  @JoinColumn({ name: 'provinceId' })
  province: ProvinceEntity;

  @OneToMany(() => AddressEntity, (address) => address.district)
  addresses: AddressEntity[];
}
