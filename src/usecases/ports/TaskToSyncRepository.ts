import { TaskToSync } from '../../entities/TaskToSync';

export interface TaskToSyncRepositoryPort {
  find(name?: string): Promise<TaskToSync[]>;
  findById(id: string): Promise<TaskToSync | undefined>;
  create(task: TaskToSync): Promise<void>;
  deleteById(id: string): Promise<void>;
}
