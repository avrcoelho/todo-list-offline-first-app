import { Task } from '../../../entities/Task';
import { TaskGateway } from '../../../infrastructure/gateways/TaskGateway';
import { TaskRepository } from '../../../infrastructure/repository/TaskRepository';
import { TaskToSyncRepository } from '../../../infrastructure/repository/TaskToSyncRepository';
import { CreateTask } from '../../../usecases/CreateTask';

type Props = Omit<Task, 'id'>;

export const makeCreateTask = async (props: Props) => {
  const taskRepository = new TaskRepository();
  const taskToSyncRepository = new TaskToSyncRepository();
  const taskGateway = new TaskGateway();
  const createTask = new CreateTask(
    taskRepository,
    taskToSyncRepository,
    taskGateway,
  );
  return createTask.execute.call(createTask, props);
};
