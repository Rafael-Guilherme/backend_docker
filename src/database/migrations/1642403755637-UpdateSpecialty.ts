import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSpecialty1642403755637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update expert set specialty='' where specialty='0'`
    );
    await queryRunner.query(
      `update expert set specialty='Fonodiólogo' where specialty='1'`
    );
    await queryRunner.query(
      `update expert set specialty='Psicólogo' where specialty='2'`
    );
    await queryRunner.query(
      `update expert set specialty='Pedagogo' where specialty='3'`
    );
    await queryRunner.query(
      `update expert set specialty='Terapeuta Ocupacional' where specialty='4'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
