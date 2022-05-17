import { Task } from "../../entities/Task";
import { TasRepositoryPort } from "../../usecases/ports/TaskRepository";
import { Store } from "../store";

export class TaskRepository implements TasRepositoryPort {
  async find(params = {}): Promise<Task[]> {
    const [firstSearch, ...anotherSerach] = Object.entries(params).map(
      ([key, value]) => `${key}='${value}'`
    );
    const store = await Store.init();
    let tasks = store.objects<Task>("Task");
    if (firstSearch) {
      tasks = tasks.filtered(firstSearch, ...anotherSerach);
    }
    const parsedTasks = tasks.map((task) => task);
    return parsedTasks;
  }

  async findById(id: string): Promise<Task> {
    const store = await Store.init();
    const tasks = store.objectForPrimaryKey<Task>("Task", id);
    return tasks;
  }

  async create(task: Omit<Task, "_id">): Promise<void> {
    const store = await Store.init();
    const _id = new Realm.BSON.ObjectId();
    store.write(() => {
      store.create("Task", { _id, ...task });
    });
  }

  async update({ _id, ...restTaskToUpdate }: Task): Promise<void> {
    const task = await this.findById(_id);
    const store = await Store.init();
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
  }

  async deleteById(id: string): Promise<void> {
    let task = await this.findById(id);
    const store = await Store.init();
    store.write(() => {
      store.delete(task);
      task = null;
    });
  }
}
