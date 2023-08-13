import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterPatient1642400701957 implements MigrationInterface {
  private columnPartner = new TableColumn({
    name: "partner",
    type: "JSON",
  });

  private columnTeam = new TableColumn({
    name: "team",
    type: "JSON",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("patient", this.columnPartner);
    await queryRunner.addColumn("patient", this.columnTeam);

    await queryRunner.query(
      `update patient set partner='[]' where id <> ''`
    );
    await queryRunner.query(
      `update patient set team='[]' where id <> ''`
    );
  }

  // public async down(queryRunner: QueryRunner): Promise<void> {
  //   await queryRunner.dropColumn("patient", this.columnPartner);
  //   await queryRunner.dropColumn("patient", this.columnTeam);
  // }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`update patient set partner=NULL where id <> ''`);
    await queryRunner.query(`update patient set team=NULL where id <> ''`);
  }

}
