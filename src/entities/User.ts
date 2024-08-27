import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuid } from 'uuid';
import { UserType } from "./UserType";
import bcrypt from 'bcrypt';

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  password: string;

  @Column()
  type_id: string;

  @OneToOne(() => UserType)
  @JoinColumn({ name: "type_id" })
  type: UserType;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
