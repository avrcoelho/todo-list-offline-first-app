import { TaskRepositoryPort } from "./ports/TaskRepository";
import { TaskToSyncRepositoryPort } from "./ports/TaskToSyncRepository";

export class DeleteTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort
  ) {}

  async execute(_id: string) {
    await this.taskRepository.deleteById(_id);
    await this.taskToSyncRepository.deleteById(_id);
  }
}
