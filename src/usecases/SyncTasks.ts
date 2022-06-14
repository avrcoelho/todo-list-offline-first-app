import { TaskRepositoryPort } from './ports/TaskRepository';
import { SyncRemoteTasks } from './SyncRemoteTasks';
import { SyncTasksCreated } from './SyncTasksCreated';
import { SyncTasksDeleted } from './SyncTasksDeleted';
import { SyncTasksUpdated } from './SyncTasksUpdated';

export class SyncTasks {
  constructor(
    private readonly syncTasksCreated: SyncTasksCreated,
    private readonly syncTasksUpdated: SyncTasksUpdated,
    private readonly syncTasksDeleted: SyncTasksDeleted,
    private readonly syncRemoteTasks: SyncRemoteTasks,
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute() {
    const requests = [
      this.syncTasksCreated.execute(),
      this.syncTasksUpdated.execute(),
      this.syncTasksDeleted.execute(),
    ];
    await Promise.all(requests);
    this.taskRepository.close();
    return this.syncRemoteTasks.execute();
  }
}
