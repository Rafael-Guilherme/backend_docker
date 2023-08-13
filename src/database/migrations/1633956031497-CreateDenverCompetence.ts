import { MigrationInterface, QueryRunner, Table, createQueryBuilder } from "typeorm";

import denverCompetence from './denverCompetence.json'

export class CreateDenverCompetence1633956031497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "denverCompetence",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "level",
            type: "varchar(1)",
          },
          {
            name: "domain",
            type: "varchar",
          },
          {
            name: "enable",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await createQueryBuilder().insert().into('denverCompetence').values(denverCompetence).execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("denverCompetence");
  }
}
