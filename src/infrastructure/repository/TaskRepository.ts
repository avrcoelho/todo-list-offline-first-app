import { Task } from '../../entities/Task';
import {
  CreateParams,
  TaskRepositoryPort,
} from '../../usecases/ports/TaskRepository';
import { Store } from '../store';

const storeInstance = Store.getInstance();

export class TaskRepository implements TaskRepositoryPort {
  async find(params = {}): Promise<Task[]> {
    const firstSearch = Object.entries(params)
      .filter(([, value]) => !!value)
      .map(([key, value]) =>
        key === 'name'
          ? `${key} CONTAINS[c] '${value}'`
          : `${key} = '${value}'`,
      );
    const store = await storeInstance.getConnection();
    let tasks = store.objects<Task>('Task');
    if (firstSearch.length) {
      tasks = tasks.filtered(firstSearch.join(' || '));
    }
    const tasksSerialized = tasks.map(task => ({
      id: task.id,
      name: task.name,
      status: task.status,
    }));
    return tasksSerialized;
  }

  async findById(id: string): Promise<Task | undefined> {
    const newStoreInstance = await storeInstance.getConnection();
    const idParsed = new Realm.BSON.ObjectId(id);
    return newStoreInstance.objectForPrimaryKey<Task>('Task', idParsed);
  }

  async create(task: CreateParams): Promise<Task> {
    const store = await storeInstance.getConnection();
    const id = new Realm.BSON.ObjectId(task.id);
    store.write(() => {
      store.create('Task', { ...task, id });
    });
    return { ...task, id: String(id) };
  }

  async update({ id, ...restTaskToUpdate }: Task): Promise<Task> {
    const store = await storeInstance.getConnection();
    const task = await this.findById(id);
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
    return { id, ...restTaskToUpdate };
  }

  async deleteById(id: string): Promise<void> {
    const store = await storeInstance.getConnection();
    let task = await this.findById(id);
    store.write(() => {
      store.delete(task);
      task = undefined;
    });
  }

  close() {
    storeInstance.close();
  }
}
