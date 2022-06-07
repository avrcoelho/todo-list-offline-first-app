import { Task } from "../entities/Task";
import { TaskRepositoryPort } from "./ports/TaskRepository";
import { TaskToSyncRepositoryPort } from "./ports/TaskToSyncRepository";

export class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskToSyncRepository: TaskToSyncRepositoryPort
  ) {}

  async execute({ status = "resolved", ...restTask }: Omit<Task, "_id">) {
    const task = await this.taskRepository.create({ status, ...restTask });
    await this.taskToSyncRepository.create({ _id: task._id, type: "created" });
    return task;
  }
}
