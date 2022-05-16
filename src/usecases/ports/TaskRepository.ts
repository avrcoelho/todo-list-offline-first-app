import { Task } from "../../entities/Task";

export interface TasRepositoryPort {
  find(params?: Partial<Task>): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  create(task: Omit<Task, "_id">): Promise<void>;
  update(task: Task): Promise<void>;
  deleteById(id: string): Promise<void>;
}
