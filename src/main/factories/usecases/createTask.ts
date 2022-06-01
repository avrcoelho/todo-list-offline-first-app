import { Task } from "../../../entities/Task";
import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { CreateTask } from "../../../usecases/CreateTask";

type Props = Omit<Task, "_id">;

export const makeCreateTask = async (props: Props) => {
  const taskRepository = new TaskRepository();
  const createTask = new CreateTask(taskRepository);
  return createTask.execute.call(createTask, props);
};
