import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserType1724673366564 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "userType",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "type",
            type: "varchar",
            isUnique: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userType");
  }

}
