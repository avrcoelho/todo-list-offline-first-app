import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class SyncTasksDeleted {
  constructor(
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute() {
    const tasksDeleted = await this.taskToSyncRepository.find('deleted');
    await Promise.all(
      tasksDeleted.map(async ({ id, taskId }) => {
        await this.taskGateway.deleteById(taskId);
        await this.taskToSyncRepository.deleteById(id);
      }),
    );
  }
}
