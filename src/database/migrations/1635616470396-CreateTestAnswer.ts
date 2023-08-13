import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTestAnswer1635616470396 implements MigrationInterface {
  private tableName = "testAnswer";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "test_id",
            type: "int",
          },
          {
            name: "denverAbility_id",
            type: "int",
          },
          {
            name: "answer",
            type: "TINYINT",
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
            name: "FK_Test_TestAnswer",
            columnNames: ["test_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "test",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_Ability_TestAnswer",
            columnNames: ["denverAbility_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "denverAbility",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
        indices: [
          {
            columnNames: ["test_id", "denverAbility_id"],
            isUnique: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
