import { Task } from '../../entities/Task';

export interface CreateParams extends Omit<Task, 'id'> {
  id?: string;
}

export interface TaskRepositoryPort {
  find(name?: string): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
  create(task: CreateParams): Promise<Task>;
  update(task: Task): Promise<Task>;
  deleteById(id: string): Promise<void>;
  close(): void;
}
