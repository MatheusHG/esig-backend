import { Request, Response } from "express";
import AppDataSource from "../../database/index";
import { UserTypeRepository } from "../repositories/UserTypeRepository";
import { UserTypeService } from "../services/UserTypeService";

class UserTypeController {
  async create(request: Request, response: Response) {
    const { type } = request.body;

    if(!type) {
      return response.status(400).json({ message: 'Type obrigatório' });
    }

    const userTypeRepository = new UserTypeRepository(AppDataSource);
    const service = new UserTypeService(userTypeRepository);

    const result = await service.execute({ type });

    if (result instanceof Error) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(200).json({ message: 'OK', data: { type } });
  }

  async findAll(request: Request, response: Response) {
    const userTypeRepository = new UserTypeRepository(AppDataSource);
    const service = new UserTypeService(userTypeRepository);

    const result = await service.findAll();

    return response.status(200).json({ message: 'OK', data: result });
  }
}

export default new UserTypeController();