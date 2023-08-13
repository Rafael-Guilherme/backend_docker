import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTest1635005026487 implements MigrationInterface {
  private tableName = "test";

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
            name: "user_id",
            type: "varchar",
          },
          {
            name: "patient_id",
            type: "varchar",
          },
          {
            name: "type",
            type: "enum",
            enum: ["denver"],
          },
          {
            name: "finished",
            type: "boolean",
            default: false,
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
            name: "FK_User_DenverTest",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_Patient_DenverTest",
            columnNames: ["patient_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "patient",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
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
