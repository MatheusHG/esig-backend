import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1724673355604 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "type_id",
            type: "uuid"
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "telephone",
            type: "varchar"
          },
          {
            name: "password",
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
            name: "FKUserType",
            columnNames: ["type_id"],
            referencedTableName: "userType",
            referencedColumnNames: ["id"],
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
