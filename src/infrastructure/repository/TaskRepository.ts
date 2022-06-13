import { Task } from '../../entities/Task';
import { TaskRepositoryPort } from '../../usecases/ports/TaskRepository';
import { Store } from '../store';

export class TaskRepository extends Store implements TaskRepositoryPort {
  async find(params = {}): Promise<Task[]> {
    const firstSearch = Object.entries(params)
      .filter(([, value]) => !!value)
      .map(([key, value]) =>
        key === 'name'
          ? `${key} CONTAINS[c] '${value}'`
          : `${key} = '${value}'`,
      );
    const store = await this.init();
    let tasks = store.objects<Task>('Task');
    if (firstSearch.length) {
      tasks = tasks.filtered(firstSearch.join(' || '));
    }
    const tasksSerialized = tasks.map(task => ({
      id: task.id,
      name: task.name,
      status: task.status,
    }));
    store.close();
    return tasksSerialized;
  }

  async findById(id: string, store?: Realm): Promise<Task | undefined> {
    const newStoreInstance = store || (await this.init());
    const idParsed = new Realm.BSON.ObjectId(id);
    return newStoreInstance.objectForPrimaryKey<Task>('Task', idParsed);
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const store = await this.init();
    const id = new Realm.BSON.ObjectId();
    store.write(() => {
      store.create('Task', { ...task, id });
    });
    store.close();
    return { ...task, id: String(id) };
  }

  async update({ id, ...restTaskToUpdate }: Task): Promise<Task> {
    const store = await this.init();
    const task = await this.findById(id, store);
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
    store.close();
    return { id, ...restTaskToUpdate };
  }

  async deleteById(id: string): Promise<void> {
    const store = await this.init();
    let task = await this.findById(id, store);
    store.write(() => {
      store.delete(task);
      task = undefined;
    });
    store.close();
  }
}
