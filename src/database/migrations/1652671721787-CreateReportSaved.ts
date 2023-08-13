import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReportSaved1652671721787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reportSaved",
        columns: [
          {
            name: "test_id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "answers",
            type: "JSON",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reportSaved");
  }
}
