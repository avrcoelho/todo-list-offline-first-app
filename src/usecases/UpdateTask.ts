import { Task } from '../entities/Task';
import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class UpdateTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute({ status = 'resolved', ...restTask }: Task) {
    const task = await this.taskRepository.update({ status, ...restTask });
    try {
      await this.taskGateway.update(task);
    } catch {
      await this.taskToSyncRepository.create({
        taskId: task.id,
        type: 'updated',
      });
    }
    this.taskRepository.close();
    return task;
  }
}
