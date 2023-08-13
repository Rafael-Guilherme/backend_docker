import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPatientUnique1648533710987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE patient ADD UNIQUE INDEX cpfcnpj_UNIQUE (cpfcnpj ASC) VISIBLE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
