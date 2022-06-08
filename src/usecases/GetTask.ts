import { TaskRepository } from '../infrastructure/repository/TaskRepository';

export class GetTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(_id: string) {
    return this.taskRepository.findById(_id);
  }
}
