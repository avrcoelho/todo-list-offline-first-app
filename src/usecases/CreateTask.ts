import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ status = "resolved", ...restTask }: Omit<Task, "_id">) {
    return this.taskRepository.create({ status, ...restTask });
  }
}
