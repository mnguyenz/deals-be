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

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[];

  @OneToMany(() => AddressEntity, (address) => address.province)
  addresses: AddressEntity[];
}
