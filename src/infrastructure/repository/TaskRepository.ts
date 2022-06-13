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
      _id: task._id,
      name: task.name,
      status: task.status,
    }));
    store.close();
    return tasksSerialized;
  }

  async findById(_id: string, store?: Realm): Promise<Task | undefined> {
    const newStoreInstance = store || (await this.init());
    const _idParsed = new Realm.BSON.ObjectId(_id);
    return newStoreInstance.objectForPrimaryKey<Task>('Task', _idParsed);
  }

  async create(task: Omit<Task, '_id'>): Promise<Task> {
    const store = await this.init();
    const _id = new Realm.BSON.ObjectId();
    store.write(() => {
      store.create('Task', { ...task, _id });
    });
    store.close();
    return { ...task, _id: String(_id) };
  }

  async update({ _id, ...restTaskToUpdate }: Task): Promise<Task> {
    const store = await this.init();
    const task = await this.findById(_id, store);
    store.write(() => {
      Object.assign(task, restTaskToUpdate);
    });
    store.close();
    return { _id, ...restTaskToUpdate };
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
