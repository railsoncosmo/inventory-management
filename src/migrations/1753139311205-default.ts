import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1753139311205 implements MigrationInterface {
    name = 'Default1753139311205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "displayName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "displayName"`);
    }

}
