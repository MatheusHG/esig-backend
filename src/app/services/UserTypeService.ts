import { UserType } from "../../entities/UserType";
import { UserTypeRepository } from "../repositories/UserTypeRepository";

type UserTypeRequest = {
  type: string;
}

export class UserTypeService {
  constructor(private userTypeRepository: UserTypeRepository) {}

  async execute(data: UserTypeRequest): Promise<UserType | Error> {
    const repo = this.userTypeRepository;
    const existingUser = await repo.findByType(data.type);

    if (existingUser) {
      return new Error("User Type already exists");
    }

    const newUser = repo.create(data);
    await repo.save(newUser);

    return newUser;
  }
}