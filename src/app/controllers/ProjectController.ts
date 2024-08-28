import { Request, Response } from "express";
import AppDataSource from "../../database/index";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectService } from "../services/ProjectService";

class ProjectController {
  async create(request: Request, response: Response) {
    const { name } = request.body;

    if(!name) {
      return response.status(400).json({ message: 'Nome obrigatório' });
    }

    const projectRepository = new ProjectRepository(AppDataSource);
    const service = new ProjectService(projectRepository);

    const result = await service.execute({ name });

    if (result instanceof Error) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(200).json({ message: 'OK', data: { name } });
  }

  async findAll(request: Request, response: Response) {
    const projectRepository = new ProjectRepository(AppDataSource);
    const service = new ProjectService(projectRepository);

    const result = await service.findAll();

    return response.status(200).json({ message: 'OK', data: result });
  }
}

export default new ProjectController();