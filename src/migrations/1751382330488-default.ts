import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1751382330488 implements MigrationInterface {
    name = 'Default1751382330488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

}
