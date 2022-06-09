import { Task } from '../../entities/Task';

export interface TaskGatewayPort {
  delete(id: string): Promise<void>;
  update(task: Task): Promise<void>;
  create(task: Task): Promise<void>;
}
