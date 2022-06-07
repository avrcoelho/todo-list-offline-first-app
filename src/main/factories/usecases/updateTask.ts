import { Task } from "../../../entities/Task";
import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { TaskToSyncRepository } from "../../../infrastructure/repository/TaskToSyncRepository";
import { UpdateTask } from "../../../usecases/UpdateTask";

export const makeUpdateTask = async (task: Task) => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const updateTask = new UpdateTask(taskRepository, taskToSyncRepository);
  return updateTask.execute.call(updateTask, task);
};
