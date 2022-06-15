import { Task } from '../../../entities/Task';
import { TaskGateway } from '../../../infrastructure/gateways/TaskGateway';
import { TaskRepository } from '../../../infrastructure/repository/TaskRepository';
import { TaskToSyncRepository } from '../../../infrastructure/repository/TaskToSyncRepository';
import { UpdateTask } from '../../../usecases/UpdateTask';

export const makeUpdateTask = async (task: Task) => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const taskGateway = new TaskGateway();
  const updateTask = new UpdateTask(
    taskRepository,
    taskToSyncRepository,
    taskGateway,
  );
  return updateTask.execute.call(updateTask, task);
};
