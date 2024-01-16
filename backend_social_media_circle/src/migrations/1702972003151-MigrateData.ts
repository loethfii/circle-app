import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateData1702972003151 implements MigrationInterface {
    name = 'MigrateData1702972003151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_35c345d074803326a814f6035e8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_35c345d074803326a814f6035e8"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "usersId"`);
    }

}
