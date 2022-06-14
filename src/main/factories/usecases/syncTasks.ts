import { TaskGateway } from '../../../infrastructure/gateways/TaskGateway';
import { TaskRepository } from '../../../infrastructure/repository/TaskRepository';
import { TaskToSyncRepository } from '../../../infrastructure/repository/TaskToSyncRepository';
import { SyncRemoteTasks } from '../../../usecases/SyncRemoteTasks';
import { SyncTasks } from '../../../usecases/SyncTasks';
import { SyncTasksCreated } from '../../../usecases/SyncTasksCreated';
import { SyncTasksDeleted } from '../../../usecases/SyncTasksDeleted';
import { SyncTasksUpdated } from '../../../usecases/SyncTasksUpdated';

export const makeSyncTasks = async () => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const taskGateway = new TaskGateway();
  const syncTasksCreated = new SyncTasksCreated(
    taskToSyncRepository,
    taskRepository,
    taskGateway,
  );
  const syncTasksUpdated = new SyncTasksUpdated(
    taskToSyncRepository,
    taskRepository,
    taskGateway,
  );
  const syncTasksDeleted = new SyncTasksDeleted(
    taskToSyncRepository,
    taskGateway,
  );
  const syncRemoteTasks = new SyncRemoteTasks(taskRepository, taskGateway);
  const syncTasks = new SyncTasks(
    syncTasksCreated,
    syncTasksUpdated,
    syncTasksDeleted,
    syncRemoteTasks,
    taskRepository,
  );
  return syncTasks.execute.bind(syncTasks)();
};
