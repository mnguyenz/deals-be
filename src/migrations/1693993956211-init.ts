import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693993956211 implements MigrationInterface {
    name = 'Init1693993956211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Provinces" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deteledAt" TIMESTAMP, "revision" integer NOT NULL, "code" integer NOT NULL, "fullName" character varying NOT NULL, "name" character varying NOT NULL, "prefix" character varying NOT NULL, CONSTRAINT "UQ_060f11ff676c172eae9ec791d0f" UNIQUE ("code"), CONSTRAINT "PK_8b487d80d948fe12b87ba7bf4bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Districts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deteledAt" TIMESTAMP, "revision" integer NOT NULL, "code" integer NOT NULL, "fullName" character varying NOT NULL, "name" character varying NOT NULL, "prefix" character varying NOT NULL, "provinceId" integer NOT NULL, CONSTRAINT "UQ_611e02b933c8e77f87ac0043ce2" UNIQUE ("code"), CONSTRAINT "PK_7b373d1b7b5b7c89515ce0de853" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Addresses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deteledAt" TIMESTAMP, "revision" integer NOT NULL, "raw" text, "street" character varying, "provinceId" integer, "districtId" integer, CONSTRAINT "PK_239c81748e5a62ac7223a7350c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Flyers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deteledAt" TIMESTAMP, "revision" integer NOT NULL, "name" character varying, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP NOT NULL DEFAULT now(), "pages" jsonb, "brandId" integer, CONSTRAINT "PK_a5cd75384c7c1782a1200c27a56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Brands" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deteledAt" TIMESTAMP, "revision" integer NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "logoAwsLink" character varying, CONSTRAINT "UQ_787ec012a64e08e233ee787e128" UNIQUE ("code"), CONSTRAINT "PK_100d549ad83dafeecad2fd74570" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Districts" ADD CONSTRAINT "FK_cf94b5d910c3bb2cf61fe3e4c70" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Addresses" ADD CONSTRAINT "FK_a4999cd8b0c39c0e75034ad8c25" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Addresses" ADD CONSTRAINT "FK_7685768f992af77d5355e211b24" FOREIGN KEY ("districtId") REFERENCES "Districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Flyers" ADD CONSTRAINT "FK_c6c93fe6565c2733ff108bbc406" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Flyers" DROP CONSTRAINT "FK_c6c93fe6565c2733ff108bbc406"`);
        await queryRunner.query(`ALTER TABLE "Addresses" DROP CONSTRAINT "FK_7685768f992af77d5355e211b24"`);
        await queryRunner.query(`ALTER TABLE "Addresses" DROP CONSTRAINT "FK_a4999cd8b0c39c0e75034ad8c25"`);
        await queryRunner.query(`ALTER TABLE "Districts" DROP CONSTRAINT "FK_cf94b5d910c3bb2cf61fe3e4c70"`);
        await queryRunner.query(`DROP TABLE "Brands"`);
        await queryRunner.query(`DROP TABLE "Flyers"`);
        await queryRunner.query(`DROP TABLE "Addresses"`);
        await queryRunner.query(`DROP TABLE "Districts"`);
        await queryRunner.query(`DROP TABLE "Provinces"`);
    }

}
