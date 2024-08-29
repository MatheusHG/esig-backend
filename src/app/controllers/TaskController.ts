import { Request, Response } from "express";
import AppDataSource from "../../database/index";
import { TaskService } from "../services/TaskService";
import { TaskRepository } from "../repositories/TaskRepository";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UploadFileService } from "../../config/upload";
import { v4 as uuid } from 'uuid';

class TaskController {
  async create(request: Request, response: Response) {
    const { name, description, priority, deadline, projectId, userId } = request.body;
    const requestImages = request.file as Express.Multer.File;
    
    if (!name || !description || !priority || !deadline || !projectId) {
      return response.status(400).json({ message: 'Preencha todos os campos' });
    }

    if(!userId) {
      return response.status(400).json({ message: 'Usuário não encontrado' });
    }

    const typesPriority = ['low', 'medium', 'high'];
    if(!typesPriority.includes(priority)) {
      return response.status(400).json({ message: 'Priority deverá ser: low, medium ou high' });
    }

    let fileName = null;
    if(requestImages) {
      const serviceS3 = new UploadFileService();
      fileName = await serviceS3.upload(requestImages, `${uuid()}-${requestImages.originalname}`);
    }

    const taskRepository = new TaskRepository(AppDataSource);
    const projectRepository = new ProjectRepository(AppDataSource);
    const userRepository = new UserRepository(AppDataSource);
    const service = new TaskService(taskRepository, projectRepository, userRepository);

    const result = await service.execute({ 
      name,
      description,
      priority,
      deadline,
      urlFile: fileName,
      projectId,
      responsibleUser: userId,
    });

    if (result instanceof Error) {
      return response.status(400).json({ message: result.message });
    }

    return response.status(200).json({ message: 'OK', data: { name } });
  }

  async findAll(request: Request, response: Response) {
    const taskRepository = new TaskRepository(AppDataSource);
    const projectRepository = new ProjectRepository(AppDataSource);
    const userRepository = new UserRepository(AppDataSource);
    const service = new TaskService(taskRepository, projectRepository, userRepository);
    const idUser = request.body.userId;

    const result = await service.findByUserAll(idUser);

    return response.status(200).json({ message: 'OK', data: result });
  }

  async overview(request: Request, response: Response) {
    const taskRepository = new TaskRepository(AppDataSource);
    const projectRepository = new ProjectRepository(AppDataSource);
    const userRepository = new UserRepository(AppDataSource);
    const service = new TaskService(taskRepository, projectRepository, userRepository);
    const idUser = request.body.userId;

    const result = await service.overview(idUser);

    return response.status(200).json({ message: 'OK', data: result });
  }
}

export default new TaskController();