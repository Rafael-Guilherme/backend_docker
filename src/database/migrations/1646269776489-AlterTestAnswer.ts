import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTestAnswer1646269776489 implements MigrationInterface {
    private columnIntervention = new TableColumn({
        name: "intervention",
        type: "boolean",
        default: false
      });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("testAnswer", this.columnIntervention);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("testAnswer", this.columnIntervention);
    }

}
