import { Task } from "../../entities/Task";

export interface TasRepositoryPort {
  find(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  deleteById(id: string): Promise<void>;
}
