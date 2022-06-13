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
    await this.syncTasksCreated.execute();
    await this.syncTasksUpdated.execute();
    await this.syncTasksDeleted.execute();
  }
}
