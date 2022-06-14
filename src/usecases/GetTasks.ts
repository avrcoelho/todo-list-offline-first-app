import { Task } from '../entities/Task';
import { TaskRepository } from '../infrastructure/repository/TaskRepository';

export class GetTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params?: Partial<Task>) {
    const tasks = await this.taskRepository.find(params);
    this.taskRepository.close();
    return tasks;
  }
}
