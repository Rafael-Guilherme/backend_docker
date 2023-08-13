import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAbilityName21648533246922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update denverCompetence set domain = "Jogo" where domain = "Jogo: de Representação" AND id = 21`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Jogo - ", name) where denverCompetence_id = '21'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Jogo - ", name) where denverCompetence_id = '22'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
