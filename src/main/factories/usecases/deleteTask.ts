import { TaskGateway } from '../../../infrastructure/gateways/TaskGateway';
import { TaskRepository } from '../../../infrastructure/repository/TaskRepository';
import { TaskToSyncRepository } from '../../../infrastructure/repository/TaskToSyncRepository';
import { DeleteTask } from '../../../usecases/DeleteTask';

export const makeDeleteTask = async (id: string) => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const taskGateway = new TaskGateway();
  const deleteTask = new DeleteTask(
    taskRepository,
    taskToSyncRepository,
    taskGateway,
  );
  await deleteTask.execute.call(deleteTask, id);
};
