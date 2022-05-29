import { TaskRepository } from "../../../infrastructure/repository/TaskRepository";
import { DeleteTask } from "../../../usecases/DeleteTask";

export const makeDeleteTask = async (id: string) => {
  const taskRepository = new TaskRepository();
  const deleteTask = new DeleteTask(taskRepository);
  await deleteTask.execute.call(deleteTask, id);
};
