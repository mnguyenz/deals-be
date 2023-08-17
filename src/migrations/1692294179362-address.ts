import { MigrationInterface, QueryRunner } from 'typeorm';

export class Address1692294179362 implements MigrationInterface {
  name = 'Address1692294179362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Provinces" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deteledAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "revision" integer NOT NULL, "code" integer NOT NULL, "vietName" character varying NOT NULL, "vietCapitalizeName" character varying NOT NULL, "withoutAccentsName" character varying NOT NULL, "withoutAccentsCapitalizeName" character varying NOT NULL, "vietPrefix" character varying, "vietCapitalizePrefix" character varying, "withoutAccentsPrefix" character varying NOT NULL, "withoutAccentsCapitalizePrefix" character varying NOT NULL, CONSTRAINT "UQ_060f11ff676c172eae9ec791d0f" UNIQUE ("code"), CONSTRAINT "PK_8b487d80d948fe12b87ba7bf4bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Districts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deteledAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "revision" integer NOT NULL, "code" integer, "vietName" character varying NOT NULL, "vietCapitalizeName" character varying NOT NULL, "withoutAccentsName" character varying NOT NULL, "withoutAccentsCapitalizeName" character varying NOT NULL, "vietPrefix" character varying, "vietCapitalizePrefix" character varying, "withoutAccentsPrefix" character varying NOT NULL, "withoutAccentsCapitalizePrefix" character varying NOT NULL, "provinceId" integer, CONSTRAINT "UQ_611e02b933c8e77f87ac0043ce2" UNIQUE ("code"), CONSTRAINT "PK_7b373d1b7b5b7c89515ce0de853" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Addresses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deteledAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "revision" integer NOT NULL, "raw" text, "street" character varying, "provinceId" integer, "districtId" integer, CONSTRAINT "PK_239c81748e5a62ac7223a7350c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Districts" ADD CONSTRAINT "FK_cf94b5d910c3bb2cf61fe3e4c70" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Addresses" ADD CONSTRAINT "FK_a4999cd8b0c39c0e75034ad8c25" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Addresses" ADD CONSTRAINT "FK_7685768f992af77d5355e211b24" FOREIGN KEY ("districtId") REFERENCES "Districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Addresses" DROP CONSTRAINT "FK_7685768f992af77d5355e211b24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Addresses" DROP CONSTRAINT "FK_a4999cd8b0c39c0e75034ad8c25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Districts" DROP CONSTRAINT "FK_cf94b5d910c3bb2cf61fe3e4c70"`,
    );
    await queryRunner.query(`DROP TABLE "Addresses"`);
    await queryRunner.query(`DROP TABLE "Districts"`);
    await queryRunner.query(`DROP TABLE "Provinces"`);
  }
}
