import { Task } from '../entities/Task';
import { TaskRepositoryPort } from './ports/TaskRepository';
import { TaskToSyncRepositoryPort } from './ports/TaskToSyncRepository';

export class UpdateTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort,
  ) {}

  async execute({ status = 'resolved', ...restTask }: Task) {
    const task = await this.taskRepository.update({ status, ...restTask });
    await this.taskToSyncRepository.create({ _id: task._id, type: 'updated' });
    return task;
  }
}
