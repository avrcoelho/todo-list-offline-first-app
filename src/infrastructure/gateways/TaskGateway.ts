import { Task } from '../../entities/Task';
import { TaskGatewayPort } from '../../usecases/ports/TaskGateway';
import { HttpClient } from '../http/httpClient/HttpClient';

const URL = 'http://localhost:3333/tasks';

type ErrorData = {
  response: {
    status: number;
  };
};

const NOT_FOUND = 404;

export class TaskGateway extends HttpClient implements TaskGatewayPort {
  private veriryStatus(error: ErrorData) {
    if (error.response.status !== NOT_FOUND) {
      throw new Error();
    }
  }

  async find(): Promise<Task[]> {
    const { data } = await this.getRequest<Task[]>({
      url: URL,
    });
    return data;
  }

  async create(task: Task): Promise<void> {
    await this.postRequest({
      url: URL,
      body: task,
    });
  }

  async update(task: Task): Promise<void> {
    try {
      await this.putRequest({
        url: `${URL}/${task.id}`,
        body: task,
      });
    } catch (error) {
      this.veriryStatus(error as ErrorData);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.deleteRequest({
        url: `${URL}/${id}`,
      });
    } catch (error) {
      this.veriryStatus(error as ErrorData);
    }
  }
}
