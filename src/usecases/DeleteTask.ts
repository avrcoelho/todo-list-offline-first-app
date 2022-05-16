import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(_id: string) {
    await this.taskRepository.deleteById(_id);
  }
}
