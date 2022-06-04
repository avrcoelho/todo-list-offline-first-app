import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Task) {
    return this.taskRepository.update(task);
  }
}
