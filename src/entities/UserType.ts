import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("usersTypes")
export class UserType {
  @PrimaryColumn()
  id: string;
  
  @Column()
  type: string;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}