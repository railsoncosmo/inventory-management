import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1754361934941 implements MigrationInterface {
  name = 'Migration1754361934941'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "categories" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT NOW()')
    await queryRunner.query('ALTER TABLE "inventories" DROP COLUMN "updated_at"')
    await queryRunner.query('ALTER TABLE "inventories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()')
    await queryRunner.query('ALTER TABLE "products" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT NOW()')
    await queryRunner.query('ALTER TABLE "transactions" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "transactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT NOW()')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT NOW()')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "updated_at"')
    await queryRunner.query('ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()')
    await queryRunner.query('ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "updated_at"')
    await queryRunner.query('ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    await queryRunner.query('ALTER TABLE "transactions" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "transactions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    await queryRunner.query('ALTER TABLE "products" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "products" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    await queryRunner.query('ALTER TABLE "inventories" DROP COLUMN "updated_at"')
    await queryRunner.query('ALTER TABLE "inventories" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    await queryRunner.query('ALTER TABLE "categories" DROP COLUMN "created_at"')
    await queryRunner.query('ALTER TABLE "categories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()')
    await queryRunner.query('DROP TABLE "users_tokens"')
  }

}
