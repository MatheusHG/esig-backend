import { Project } from "../../entities/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";

type ProjectRequest = {
  name: string;
}

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(data: ProjectRequest): Promise<Project | Error> {
    const repo = this.projectRepository;
    const existingUser = await repo.findByName(data.name);

    if (existingUser) {
      return new Error("Projeto já existe");
    }

    const newUser = repo.create(data);
    await repo.save(newUser);

    return newUser;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}