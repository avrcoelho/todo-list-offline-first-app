import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { DeleteTask } from "../../../usecases/DeleteTask";

export const makeDeleteTask = () => {
  const taskRepository = new TaskRepository();
  return new DeleteTask(taskRepository);
};
