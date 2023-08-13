import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExpert1631614337975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "expert",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar(60)",
          },
          {
            name: "cpfcnpj",
            type: "varchar(14)",
            isNullable: true,
          },
          {
            name: "rg",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "mobile",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "specialty",
            type: "varchar(25)",
            default: "''",
          },
          {
            name: "zipcode",
            type: "varchar(8)",
            isNullable: true,
          },
          {
            name: "uf",
            type: "varchar(2)",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "neighborhood",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "addressNumber",
            type: "varchar(15)",
            isNullable: true,
          },
          {
            name: "complement",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "birthday",
            type: "date",
            isNullable: true,
          },
          {
            name: "bank",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "branch",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "account",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pixKey",
            type: "varchar",
            isNullable: true,
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("expert");
  }
}
