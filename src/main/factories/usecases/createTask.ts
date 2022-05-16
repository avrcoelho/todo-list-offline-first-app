import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { CreateTask } from "../../../usecases/CreateTask";

export const makeCreateTask = () => {
  const taskRepository = new TaskRepository();
  return new CreateTask(taskRepository);
};
