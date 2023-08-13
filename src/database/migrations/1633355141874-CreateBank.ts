import {MigrationInterface, QueryRunner, Table, createQueryBuilder} from "typeorm";
import banks from './banks.json'

export class CreateBank1633355141874 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'bank',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '4',
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar',
            }
          ]
        }), true)

        await createQueryBuilder().insert().into('bank').values(banks).execute()
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bank')
      }
    }
