import { Task } from '../entities/Task';
import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute({ status = 'resolved', ...restTask }: Omit<Task, 'id'>) {
    const task = await this.taskRepository.create({ status, ...restTask });
    try {
      await this.taskGateway.create(task);
    } catch {
      await this.taskToSyncRepository.create({
        taskId: task.id,
        type: 'created',
      });
    }
    this.taskRepository.close();
    return task;
  }
}
