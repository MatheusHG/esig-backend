import { DataSource, Repository } from "typeorm";
import { Task } from "../../entities/Task";

export class TaskRepository {
  private repo: Repository<Task>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Task);
  }

  async save(user: Task): Promise<Task> {
    return await this.repo.save(user);
  }

  create(data: Partial<Task>): Task {
    return this.repo.create(data);
  }

  async findByName(name: string): Promise<Task | null> {
    return await this.repo.findOne({ where: { name } });
  }

  async findById(id: string): Promise<Task | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByUserAll(id: string): Promise<Task[]> {
    return await this.repo.find({ where: { responsibleUser: id } });
  }

  async findAll(): Promise<Task[]> {
    return await this.repo.find();
  }
}
