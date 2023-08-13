import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAbilityName1645060337353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update denverCompetence set domain = "Independência Pessoal" where domain = "Independência Pessoal: Alimentação" AND id = 10`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Alimentação - ", name) where denverCompetence_id = '10'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Vestir - ", name) where denverCompetence_id = '11'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Higiene - ", name) where denverCompetence_id = '12'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Tarefas - ", name) where denverCompetence_id = '13'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '10' where denverCompetence_id = '11'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '10' where denverCompetence_id = '12'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '10' where denverCompetence_id = '13'`
    );
    await queryRunner.query(
      `update denverCompetence set domain = "Independência Pessoal" where domain = "Independência Pessoal: Alimentação" AND id = 25`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Alimentação - ", name) where denverCompetence_id = '25'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Vestir - ", name) where denverCompetence_id = '26'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Higiene - ", name) where denverCompetence_id = '27'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '25' where denverCompetence_id = '26'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '25' where denverCompetence_id = '27'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Alimentação - ", name) where denverCompetence_id = '35'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Higiene - ", name) where denverCompetence_id = '36'`
    );
    await queryRunner.query(
      `update denverAbility set name = CONCAT("Tarefas - ", name) where denverCompetence_id = '37'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '35' where denverCompetence_id = '36'`
    );
    await queryRunner.query(
      `update denverAbility set denverCompetence_id = '35' where denverCompetence_id = '37'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
