import { Task } from "../../../entities/Task";
import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { UpdateTask } from "../../../usecases/UpdateTask";

export const makeUpdateTask = async (task: Task) => {
  const taskRepository = new TaskRepository();
  const updateTask = new UpdateTask(taskRepository);
  return updateTask.execute.call(updateTask, task);
};
