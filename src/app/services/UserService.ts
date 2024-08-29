import { User } from "../../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  async execute(data: UserRequest): Promise<LoginResponse | Error> {
    const repo = this.userRepository;
    const existingUser = await repo.findByEmail(data.email);

    if (existingUser) {
      return new Error("Usuário já existe");
    }

    const newUser = repo.create(data);
    await repo.save(newUser);
    newUser.password = undefined;

    return {
      user: newUser,
      token: await this.generateToken(newUser)
    };
  }

  async login(email: string, password: string): Promise<LoginResponse | Error> {
    const repo = this.userRepository;
    const user = await repo.findByEmail(email);

    if (!user) {
      return new Error("Credenciais inválidas");
    }

    if (!await bcrypt.compare(password, user.password)) {
      return new Error("Credenciais inválidas");
    }

    user.password = undefined;
    return {
      user,
      token: await this.generateToken(user)
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async generateToken(user: User): Promise<string> {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
  }
}

interface LoginResponse {
  user: User;
  token: string;
}