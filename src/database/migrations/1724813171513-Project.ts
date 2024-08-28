import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Project1724813171513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "project",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  isUnique: true
                },
                {
                  name: "name",
                  type: "varchar",
                }
              ]
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("project");
    }

}
