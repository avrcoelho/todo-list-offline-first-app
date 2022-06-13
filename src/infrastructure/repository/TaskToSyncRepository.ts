import { TaskToSync } from '../../entities/TaskToSync';
import { TaskToSyncRepositoryPort } from '../../usecases/ports/TaskToSyncRepository';
import { Store } from '../store';

export class TaskToSyncRepository
  extends Store
  implements TaskToSyncRepositoryPort
{
  async find(type: string): Promise<TaskToSync[]> {
    const store = await this.init();
    const tasks = store.objects<TaskToSync>('TaskToSync');
    const filtered = tasks.filtered(`type = "${type}"`);
    const tasksToSyncSerialized = filtered.map(task => ({
      id: task.id,
      type: task.type,
    }));
    store.close();
    return tasksToSyncSerialized;
  }

  async findById(id: string, store?: Realm): Promise<TaskToSync | undefined> {
    const newStoreInstance = store || (await this.init());
    const idParsed = new Realm.BSON.ObjectId(id);
    const taskToSync = newStoreInstance.objectForPrimaryKey<TaskToSync>(
      'TaskToSync',
      idParsed,
    );
    if (!store) {
      newStoreInstance.close();
    }
    return taskToSync;
  }

  async create(taskToSync: TaskToSync): Promise<void> {
    const store = await this.init();
    const id = new Realm.BSON.ObjectId(taskToSync.id);
    store.write(() => {
      store.create('TaskToSync', { ...taskToSync, id });
    });
    store.close();
  }

  async deleteById(id: string): Promise<void> {
    const store = await this.init();
    let taskToSync = await this.findById(id, store);
    store.write(async () => {
      store.delete(taskToSync);
      taskToSync = undefined;
    });
    store.close();
  }
}
