import { Task } from "../../../entities/Task";
import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { TaskToSyncRepository } from "../../../infrastructure/repository/TaskToSyncRepository";
import { CreateTask } from "../../../usecases/CreateTask";

type Props = Omit<Task, "_id">;

export const makeCreateTask = async (props: Props) => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const createTask = new CreateTask(taskRepository, taskToSyncRepository);
  return createTask.execute.call(createTask, props);
};
