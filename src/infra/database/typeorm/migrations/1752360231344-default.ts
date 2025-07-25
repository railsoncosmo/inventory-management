import { MigrationInterface, QueryRunner } from 'typeorm'

export class Default1752360231344 implements MigrationInterface {
  name = 'Default1752360231344'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "inventories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "quantity" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_92fc0c77bab4a656b9619322c62" UNIQUE ("product_id"), CONSTRAINT "REL_92fc0c77bab4a656b9619322c6" UNIQUE ("product_id"), CONSTRAINT "PK_7b1946392ffdcb50cfc6ac78c0e" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" numeric(10,2) NOT NULL, "image_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "category_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TYPE "public"."transactions_type_enum" AS ENUM(\'input\', \'output\')')
    await queryRunner.query('CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid, "user_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TYPE "public"."users_role_enum" AS ENUM(\'admin\', \'user\')')
    await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" integer NOT NULL, "image_url" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT \'user\', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "inventories" ADD CONSTRAINT "FK_92fc0c77bab4a656b9619322c62" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "products" ADD CONSTRAINT "FK_0806c755e0aca124e67c0cf6d7d" FOREIGN KEY ("id") REFERENCES "inventories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_8d5b2e87f2129081ebacc894f8f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"')
    await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_8d5b2e87f2129081ebacc894f8f"')
    await queryRunner.query('ALTER TABLE "products" DROP CONSTRAINT "FK_0806c755e0aca124e67c0cf6d7d"')
    await queryRunner.query('ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"')
    await queryRunner.query('ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"')
    await queryRunner.query('ALTER TABLE "inventories" DROP CONSTRAINT "FK_92fc0c77bab4a656b9619322c62"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TYPE "public"."users_role_enum"')
    await queryRunner.query('DROP TABLE "transactions"')
    await queryRunner.query('DROP TYPE "public"."transactions_type_enum"')
    await queryRunner.query('DROP TABLE "products"')
    await queryRunner.query('DROP TABLE "inventories"')
    await queryRunner.query('DROP TABLE "categories"')
  }

}
