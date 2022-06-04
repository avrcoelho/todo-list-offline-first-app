import { Task } from "../../entities/Task";
import { TasRepositoryPort } from "../../usecases/ports/TaskRepository";
import { Store } from "../store";

export class TaskRepository implements TasRepositoryPort {
  async find(params = {}): Promise<Task[]> {
    const firstSearch = Object.entries(params)
      .filter(([, value]) => !!value)
      .map(([key, value]) =>
        key === "name" ? `${key} CONTAINS[c] '${value}'` : `${key} = '${value}'`
      );

    const store = await Store.init();
    let tasks = store.objects<Task>("Task");
    if (firstSearch.length) {
      tasks = tasks.filtered(firstSearch.join(" || "));
    }
    return tasks.map((task) => ({
      _id: task._id,
      name: task.name,
      status: task.status,
    }));
  }

  async findById(_id: string): Promise<Task | undefined> {
    const store = await Store.init();
    const _idParsed = new Realm.BSON.ObjectId(_id);
    return store.objectForPrimaryKey<Task>("Task", _idParsed);
  }

  async create(task: Omit<Task, "_id">): Promise<Task> {
    const store = await Store.init();
    const _id = new Realm.BSON.ObjectId();
    store.write(() => {
      store.create("Task", { _id, ...task });
    });
    return { _id: String(_id), ...task };
  }

  async update({ _id, ...restTaskToUpdate }: Task): Promise<Task> {
    let task = await this.findById(_id);
    const store = await Store.init();
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
    return { _id, ...restTaskToUpdate };
  }

  async deleteById(id: string): Promise<void> {
    let task = await this.findById(id);
    const store = await Store.init();
    store.write(async () => {
      store.delete(task);
      task = undefined;
    });
  }
}
