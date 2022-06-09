import { Task } from '../../entities/Task';
import { TaskGatewayPort } from '../../usecases/ports/TaskGateway';
import { HttpClient } from '../http/httpClient/HttpClient';

const URL = 'http://localhost:3333';

export class TaskGateway extends HttpClient implements TaskGatewayPort {
  async create(task: Task): Promise<void> {
    await this.postRequest({
      url: URL,
      body: task,
    });
  }

  async update(task: Task): Promise<void> {
    await this.putRequest({
      url: URL,
      body: task,
    });
  }

  async delete(id: string): Promise<void> {
    await this.deleteRequest({
      url: `${URL}/${id}`,
    });
  }
}
