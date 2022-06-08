import { TaskRepository } from '../../../infrastructure/repository/TaskRepository';
import { GetTask } from '../../../usecases/GetTask';

export const makeGetTask = () => {
  const taskRepository = new TaskRepository();
  return new GetTask(taskRepository);
};
