import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Project } from "./Project";
import { User } from "./User";

@Entity("tasks")
export class Task {
  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @Column()
  deadline: Date;

  @Column({ nullable: true })
  urlFile: string | null;

  @Column()
  projectId: string;

  @Column()
  responsibleUser: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "projectId" })
  idpr: Project;

  @ManyToOne(() => User)
  @JoinColumn({ name: "responsibleUser" })
  idus: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
