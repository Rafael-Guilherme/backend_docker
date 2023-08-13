import {
  MigrationInterface,
  QueryRunner,
  Table,
  createQueryBuilder,
} from "typeorm";

import denverAbility from "./denverAbility.json";

export class CreateDenverAbility1634040303762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "denverAbility",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "denverCompetence_id",
            type: "int",
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
        foreignKeys: [
          {
            name: "FK_DenverCompetence",
            columnNames: ["denverCompetence_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "denverCompetence",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );

    await createQueryBuilder()
      .insert()
      .into("denverAbility")
      .values(denverAbility)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("denverAbility");
  }
}
