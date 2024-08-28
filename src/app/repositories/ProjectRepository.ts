import { DataSource, Repository } from "typeorm";
import { Project } from "../../entities/Project";

export class ProjectRepository {
  private repo: Repository<Project>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Project);
  }

  async save(user: Project): Promise<Project> {
    return await this.repo.save(user);
  }

  create(data: Partial<Project>): Project {
    return this.repo.create(data);
  }

  async findByName(name: string): Promise<Project | null> {
    return await this.repo.findOne({ where: { name } });
  }

  async findById(id: string): Promise<Project | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findAll(): Promise<Project[]> {
    return await this.repo.find();
  }
}
