import { Task } from "../../entities/Task";

export interface TaskRepositoryPort {
  find(name?: string): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
  create(task: Omit<Task, "_id">): Promise<Task>;
  update(task: Task): Promise<Task>;
  deleteById(id: string): Promise<void>;
}
