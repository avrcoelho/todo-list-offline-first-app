import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class SyncTasksUpdated {
  constructor(
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute() {
    const tasksUpdated = await this.taskToSyncRepository.find('updated');
    const tasksIdUpdated = tasksUpdated.map(task => task._id);
    await Promise.all(
      tasksIdUpdated.map(async taskId => {
        const task = await this.taskRepository.findById(taskId);
        if (task) {
          await this.taskGateway.update(task);
          await this.taskToSyncRepository.deleteById(taskId);
        }
      }),
    );
  }
}
