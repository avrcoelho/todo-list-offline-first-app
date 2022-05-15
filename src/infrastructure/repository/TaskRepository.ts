import { Task } from "../../entities/Task";
import { TasRepositoryPort } from "../../usecases/ports/TaskRepository";
import { Store } from "../store";

const storeInstance = Store.getInstance();

export class TaskRepository implements TasRepositoryPort {
  async find(params = {}): Promise<Task[]> {
    const [firstSearch, ...anotherSerach] = Object.entries(params).map(
      ([key, value]) => `${key}='${value}'`
    );
    const store = await storeInstance.init();
    const tasks = store
      .objects<Task>("Tasks")
      .filtered(firstSearch, ...anotherSerach);
    return tasks.map((task) => task);
  }

  async findById(id: string): Promise<Task> {
    const store = await storeInstance.init();
    return store.objectForPrimaryKey<Task>("Tasks", id);
  }

  async create(task: Task): Promise<void> {
    const store = await storeInstance.init();
    store.write(() => {
      store.create("Task", task);
    });
  }

  async update({ id, ...restTaskToUpdate }: Task): Promise<void> {
    const task = await this.findById(id);
    const store = await storeInstance.init();
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
  }

  async deleteById(id: string): Promise<void> {
    let task = await this.findById(id);
    const store = await storeInstance.init();
    store.write(() => {
      store.delete(task);
      task = null;
    });
  }
}
