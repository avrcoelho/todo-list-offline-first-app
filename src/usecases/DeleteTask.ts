import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class DeleteTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute(id: string) {
    await this.taskRepository.deleteById(id);
    try {
      await this.taskGateway.deleteById(id);
    } catch {
      await this.taskToSyncRepository.create({ taskId: id, type: 'deleted' });
    }
    this.taskRepository.close();
  }
}
