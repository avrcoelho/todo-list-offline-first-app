import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class DeleteTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
  ) {}

  async execute(id: string) {
    await this.taskRepository.deleteById(id);
    await this.taskToSyncRepository.create({ taskId: id, type: 'deleted' });
  }
}
