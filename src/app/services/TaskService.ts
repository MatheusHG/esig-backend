import { Task } from "../../entities/Task";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { TaskRepository } from "../repositories/TaskRepository";
import { UserRepository } from "../repositories/UserRepository";

type TaskRequest = {
  name: string;
  description: string;
  priority: string;
  deadline: Date;
  urlFile: string | null;
  projectId: string;
  responsibleUser: string;
}

export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: TaskRequest): Promise<Task | Error> {
    const repo = this.taskRepository;

    const exists = await this.projectRepository.findById(data.projectId);
    if(!exists) {
      return new Error("Projeto não encontrado");
    }

    const userExists = await this.userRepository.findById(data.responsibleUser);
    console.log(data.responsibleUser);
    if(!userExists) {
      return new Error("Usuário não encontrado");
    }

    const newUser = repo.create(data);
    await repo.save(newUser);

    return newUser;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}