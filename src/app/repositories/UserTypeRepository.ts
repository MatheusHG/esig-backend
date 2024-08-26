import { DataSource, Repository } from "typeorm";
import { UserType } from "../../entities/UserType";

export class UserTypeRepository {
  private repo: Repository<UserType>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(UserType);
  }

  async save(user: UserType): Promise<UserType> {
    return await this.repo.save(user);
  }

  create(data: Partial<UserType>): UserType {
    return this.repo.create(data);
  }

  async findByType(name: string): Promise<UserType | null> {
    return await this.repo.findOne({ where: { type: name } });
  }

  async findAll(): Promise<UserType[]> {
    return await this.repo.find();
  }
}
