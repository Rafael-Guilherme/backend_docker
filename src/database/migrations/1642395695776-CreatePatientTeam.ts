// import { MigrationInterface, QueryRunner, Table } from "typeorm";

// export class CreatePatientTeam1642395695776 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: "patientTeam",
//         columns: [
//           {
//             name: "id",
//             type: "int",
//             isPrimary: true,
//             isGenerated: true,
//             generationStrategy: "increment",
//           },
//           {
//             name: "expert_id",
//             type: "varchar",
//           },
//           {
//             name: "patient_id",
//             type: "varchar",
//           },
//           {
//             name: "created_at",
//             type: "timestamp",
//             default: "now()",
//           },
//         ],
//         foreignKeys: [
//           {
//             name: "FK_Patient_PatientTeam",
//             columnNames: ["patient_id"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "patient",
//             onDelete: "CASCADE",
//             onUpdate: "CASCADE",
//           },
//         ],
//       })
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable("patientTeam");
//   }
// }
