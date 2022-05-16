import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Task) {
    await this.taskRepository.update(task);
  }
}
