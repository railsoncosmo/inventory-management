import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1757551774537 implements MigrationInterface {
    name = 'Migration1757551774537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
    }

}
