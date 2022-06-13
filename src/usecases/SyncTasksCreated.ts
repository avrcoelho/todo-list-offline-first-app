import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class SyncTasksCreated {
  constructor(
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute() {
    const tasksCreated = await this.taskToSyncRepository.find('created');
    await Promise.all(
      tasksCreated.map(async ({ id, taskId }) => {
        const task = await this.taskRepository.findById(taskId);
        if (task) {
          await this.taskGateway.create(task);
          await this.taskToSyncRepository.deleteById(id);
        }
      }),
    );
  }
}
