import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { UpdateTask } from "../../../usecases/UpdateTask";

export const makeUpdateTask = () => {
  const taskRepository = new TaskRepository();
  return new UpdateTask(taskRepository);
};
