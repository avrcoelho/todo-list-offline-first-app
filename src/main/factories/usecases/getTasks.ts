import { Task } from "../../../entities/Task";
import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { GetTasks } from "../../../usecases/GetTasks";

type Props = Omit<Task, "_id">;

export const makeGetTasks = async (props?: Props) => {
  const taskRepository = new TaskRepository();
  const getTasks = new GetTasks(taskRepository);
  return getTasks.execute.call(getTasks, props);
};
