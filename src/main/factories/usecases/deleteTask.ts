import { TaskRepository } from '../../../infrastructure/repository/TaskRepository';
import { TaskToSyncRepository } from '../../../infrastructure/repository/TaskToSyncRepository';
import { DeleteTask } from '../../../usecases/DeleteTask';

export const makeDeleteTask = async (id: string) => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const deleteTask = new DeleteTask(taskRepository, taskToSyncRepository);
  await deleteTask.execute.call(deleteTask, id);
};
