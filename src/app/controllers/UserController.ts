import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import AppDataSource from "../../database/index";

class UserController {
  async handle(request: Request, response: Response) {
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
};

export default new UserController();