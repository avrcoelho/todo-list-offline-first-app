import { TaskGatewayPort } from './ports/TaskGateway';
import { TaskRepositoryPort } from './ports/TaskRepository';

export class SyncRemoteTasks {
  constructor(
    private readonly taskRepository: TaskRepositoryPort,
    private readonly taskGateway: TaskGatewayPort,
  ) {}

  async execute() {
    const tasks = await this.taskGateway.find();
    await Promise.all(
      tasks.map(async task => {
        const localTask = await this.taskRepository.findById(task.id);
        if (localTask) {
          await this.taskRepository.update(task);
          return;
        }
        await this.taskRepository.create(task);
      }),
    );
  }
}
