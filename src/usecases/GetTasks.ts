import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class GetTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params?: Partial<Task>) {
    return this.taskRepository.find(params);
  }
}
