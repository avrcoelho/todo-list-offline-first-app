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
      _id: task._id,
      type: task.type,
    }));
    store.close();
    return tasksToSyncSerialized;
  }

  async findById(_id: string, store?: Realm): Promise<TaskToSync | undefined> {
    const newStoreInstance = store || (await this.init());
    const _idParsed = new Realm.BSON.ObjectId(_id);
    const taskToSync = newStoreInstance.objectForPrimaryKey<TaskToSync>(
      'TaskToSync',
      _idParsed,
    );
    if (!store) {
      newStoreInstance.close();
    }
    return taskToSync;
  }

  async create(taskToSync: TaskToSync): Promise<void> {
    const store = await this.init();
    const _id = new Realm.BSON.ObjectId(taskToSync._id);
    store.write(() => {
      store.create('TaskToSync', { ...taskToSync, _id });
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
