import { Task } from "../../../entities/Task";
import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { UpdateTask } from "../../../usecases/UpdateTask";

export const makeUpdateTask = (task: Task) => {
  const taskRepository = new TaskRepository();
  const updateTask = new UpdateTask(taskRepository);
  updateTask.execute.call(updateTask, task);
};
