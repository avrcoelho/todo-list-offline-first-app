import { SyncTasksCreated } from './SyncTasksCreated';
import { SyncTasksDeleted } from './SyncTasksDeleted';
import { SyncTasksUpdated } from './SyncTasksUpdated';

export class SyncTasks {
  constructor(
    private readonly syncTasksCreated: SyncTasksCreated,
    private readonly syncTasksUpdated: SyncTasksUpdated,
    private readonly syncTasksDeleted: SyncTasksDeleted,
  ) {}

  async execute() {
    const syncPromises = [
      this.syncTasksCreated.execute(),
      this.syncTasksDeleted.execute(),
      this.syncTasksUpdated.execute(),
    ];
    await Promise.all(syncPromises);
  }
}
