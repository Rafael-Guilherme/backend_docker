import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatient1631577789852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "patient",
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
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "rg",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "birthday",
            type: "date",
            isNullable: true,
          },
          {
            name: "financialName",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "note",
            type: "varchar",
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
            name: "parentage01",
            type: "varchar(20)",
            isNullable: true,
          },
          {
            name: "name01",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "cpf01",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "rg01",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "mobile01",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "email01",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "birthday01",
            type: "date",
            isNullable: true,
          },
          {
            name: "parentage02",
            type: "varchar(20)",
            isNullable: true,
          },
          {
            name: "name02",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "cpf02",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "rg02",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "mobile02",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "email02",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "birthday02",
            type: "date",
            isNullable: true,
          },
          {
            name: "school",
            type: "varchar(60)",
            isNullable: true,
          },
          {
            name: "schoolGrade",
            type: "varchar(5)",
            isNullable: true,
          },
          {
            name: "schoolPhone",
            type: "varchar(11)",
            isNullable: true,
          },
          {
            name: "schoolEmail",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "schoolExpert",
            type: "varchar(60)",
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
    await queryRunner.dropTable("patient");
  }
}
