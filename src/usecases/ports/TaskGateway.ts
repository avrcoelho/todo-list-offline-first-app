import { Task } from '../../entities/Task';

export interface TaskGatewayPort {
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  deleteById(id: string): Promise<void>;
}
