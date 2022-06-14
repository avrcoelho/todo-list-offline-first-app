import { TaskRepository } from '../infrastructure/repository/TaskRepository';

export class GetTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id);
    this.taskRepository.close();
    return task;
  }
}
