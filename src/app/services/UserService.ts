import { User } from "../../entities/User";
import { UserRepository } from "../repositories/UserRepository";

type UserRequest = {
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  password: string;
  type_id: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: UserRequest): Promise<User | Error> {
    const repo = this.userRepository;
    const existingUser = await repo.findByEmail(data.email);

    if (existingUser) {
      return new Error("User already exists");
    }

    const newUser = repo.create(data);
    await repo.save(newUser);

    return newUser;
  }
}