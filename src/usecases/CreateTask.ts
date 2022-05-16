import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Omit<Task, "_id">) {
    await this.taskRepository.create(task);
  }
}
