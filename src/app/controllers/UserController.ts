import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import AppDataSource from "../../database/index";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, telephone, cpf, password, type_id } = request.body;

    if(!name || !email || !telephone || !cpf || !password || !type_id) {
      return response.status(400).json({ message: 'Missing fields' });
    }

    const userRepository = new UserRepository(AppDataSource);
    const service = new UserService(userRepository);

    const result = await service.execute({
      name,
      email,
      telephone,
      cpf,
      password,
      type_id
    });

    if (result instanceof Error) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(200).json({ message: 'OK', data: result });
  }

  async login(request: Request, response: Response) {
    const { email, password, rememberMe } = request.body;

    if(!email || !password) {
      return response.status(400).json({ message: 'Email e Senha obrigatórios' });
    }

    const userRepository = new UserRepository(AppDataSource);
    const service = new UserService(userRepository);

    const result = await service.login(email, password, rememberMe);

    if (result instanceof Error) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(200).json({ message: 'OK', data: result });
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({ message: 'Id obrigatório' });
    }

    const userRepository = new UserRepository(AppDataSource);
    const user = await userRepository.findById(id);

    if (!user) {
      return response.status(404).json({ message: 'Credenciais inválidas' });
    }
    user.password = undefined;

    return response.status(200).json({ message: 'OK', data: user });
  }
};

export default new UserController();