import { Task } from "../../entities/Task";
import { TasRepositoryPort } from "../../usecases/ports/TaskRepository";
import { Store } from "../store";

export class TaskRepository implements TasRepositoryPort {
  async find(params = {}): Promise<Task[]> {
    const [firstSearch, ...anotherSerach] = Object.entries(params).map(
      ([key, value]) => `${key}='${value}'`
    );
    const store = await Store.init();
    const tasks = store
      .objects<Task>("Tasks")
      .filtered(firstSearch, ...anotherSerach);
    store.close();
    return tasks.map((task) => task);
  }

  async findById(id: string): Promise<Task> {
    const store = await Store.init();
    const tasks = store.objectForPrimaryKey<Task>("Tasks", id);
    store.close();
    return tasks;
  }

  async create(task: Task): Promise<void> {
    const store = await Store.init();
    store.write(() => {
      store.create("Task", task);
    });
    store.close();
  }

  async update({ id, ...restTaskToUpdate }: Task): Promise<void> {
    const task = await this.findById(id);
    const store = await Store.init();
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
    store.close();
  }

  async deleteById(id: string): Promise<void> {
    let task = await this.findById(id);
    const store = await Store.init();
    store.write(() => {
      store.delete(task);
      task = null;
    });
    store.close();
  }
}
