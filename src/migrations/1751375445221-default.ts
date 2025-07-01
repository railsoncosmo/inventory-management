import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1751375445221 implements MigrationInterface {
    name = 'Default1751375445221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_92fc0c77bab4a656b9619322c62"`);
        await queryRunner.query(`ALTER TABLE "inventories" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_92fc0c77bab4a656b9619322c62" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_92fc0c77bab4a656b9619322c62"`);
        await queryRunner.query(`ALTER TABLE "inventories" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_92fc0c77bab4a656b9619322c62" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
