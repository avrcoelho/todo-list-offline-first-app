import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { GetTasks } from "../../../usecases/GetTasks";

export const makeGetTasks = () => {
  const taskRepository = new TaskRepository();
  return new GetTasks(taskRepository);
};
