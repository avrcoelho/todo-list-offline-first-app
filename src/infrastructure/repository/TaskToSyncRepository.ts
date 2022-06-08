import { TaskToSync } from '../../entities/TaskToSync';
import { TaskToSyncRepositoryPort } from '../../usecases/ports/TaskToSyncRepository';
import { Store } from '../store';

export class TaskToSyncRepository implements TaskToSyncRepositoryPort {
  async find(): Promise<TaskToSync[]> {
    const store = await Store.init();
    const tasks = store.objects<TaskToSync>('TaskToSync');
    const tasksToSyncSerialized = tasks.map(task => ({
      _id: task._id,
      type: task.type,
    }));
    store.close();
    return tasksToSyncSerialized;
  }

  async findById(_id: string, store?: Realm): Promise<TaskToSync | undefined> {
    const newStoreInstance = store || (await Store.init());
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
    const store = await Store.init();
    const _id = new Realm.BSON.ObjectId();
    store.write(() => {
      store.create('TaskToSync', { ...taskToSync, _id });
    });
    store.close();
  }

  async deleteById(id: string): Promise<void> {
    const store = await Store.init();
    let taskToSync = await this.findById(id, store);
    store.write(async () => {
      store.delete(taskToSync);
      taskToSync = undefined;
    });
    store.close();
  }
}
