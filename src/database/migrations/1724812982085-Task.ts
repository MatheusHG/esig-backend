import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Task1724812982085 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "task",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "priority",
            type: "varchar"
          },
          {
            name: "deadline",
            type: "timestamp"
          },
          {
            name: "urlFile",
            type: "varchar",
            isNullable: true
          },
          {
            name: "projectId",
            type: "uuid"
          },
          {
            name: "responsibleUser",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ],
        foreignKeys: [
          {
            name: "FKProjectTask",
            columnNames: ["projectId"],
            referencedTableName: "project",
            referencedColumnNames: ["id"],
          },
          {
            name: "FKUserTask",
            columnNames: ["responsibleUser"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("task");
  }

}
