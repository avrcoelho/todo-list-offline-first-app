import { TaskToSync } from '../../entities/TaskToSync';

export interface TaskToSyncRepositoryPort {
  find(type: string): Promise<TaskToSync[]>;
  findById(id: string): Promise<TaskToSync | undefined>;
  create(task: Omit<TaskToSync, 'id'>): Promise<void>;
  deleteById(id: string): Promise<void>;
  close(): void;
}
