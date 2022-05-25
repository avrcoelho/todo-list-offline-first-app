import { Task } from "../../entities/Task";

export interface TasRepositoryPort {
  find(name?: string): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
  create(task: Omit<Task, "_id">): Promise<void>;
  update(task: Task): Promise<void>;
  deleteById(id: string): Promise<void>;
}
