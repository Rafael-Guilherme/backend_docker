// import { MigrationInterface, QueryRunner, Table } from "typeorm";

// export class CreatePatientPartner1642396019096 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: "patientPartner",
//         columns: [
//           {
//             name: "id",
//             type: "int",
//             isPrimary: true,
//             isGenerated: true,
//             generationStrategy: "increment",
//           },
//           {
//             name: "type",
//             type: "int",
//           },
//           {
//             name: "name",
//             type: "varchar(60)",
//           },
//           {
//             name: "phone",
//             type: "varchar(11)",
//             isNullable: true,
//           },
//           {
//             name: "email",
//             type: "varchar(100)",
//             isNullable: true,
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
//             name: "FK_Patient_PatientPartner",
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
//     await queryRunner.dropTable("patientPartner");
//   }
// }
