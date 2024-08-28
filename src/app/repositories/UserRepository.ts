import { DataSource, Repository } from "typeorm";
import { User } from "../../entities/User";

export class UserRepository {
  private repo: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(User);
  }

  async save(user: User): Promise<User> {
    return await this.repo.save(user);
  }

  create(data: Partial<User>): User {
    return this.repo.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }
}
