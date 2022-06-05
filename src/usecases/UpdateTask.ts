import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/repository/TaskRepository";

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ status = "resolved", ...restTask }: Task) {
    return this.taskRepository.update({ status, ...restTask });
  }
}
