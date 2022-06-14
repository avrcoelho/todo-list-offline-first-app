import { TaskToSync } from '../../entities/TaskToSync';
import { TaskToSyncRepositoryPort } from '../../usecases/ports/TaskToSyncRepository';
import { Store } from '../store';

const storeInstance = Store.getInstance();

export class TaskToSyncRepository implements TaskToSyncRepositoryPort {
  async find(type: string): Promise<TaskToSync[]> {
    const store = await storeInstance.getConnection();
    const tasks = store.objects<TaskToSync>('TaskToSync');
    const filtered = tasks.filtered(`type = "${type}"`);
    const tasksToSyncSerialized = filtered.map(task => ({
      id: task.id,
      taskId: task.taskId,
      type: task.type,
    }));
    return tasksToSyncSerialized;
  }

  async findById(id: string): Promise<TaskToSync | undefined> {
    const newStoreInstance = await storeInstance.getConnection();
    const idParsed = new Realm.BSON.ObjectId(id);
    const taskToSync = newStoreInstance.objectForPrimaryKey<TaskToSync>(
      'TaskToSync',
      idParsed,
    );
    return taskToSync;
  }

  async create(taskToSync: TaskToSync): Promise<void> {
    const store = await storeInstance.getConnection();
    const id = new Realm.BSON.ObjectId();
    const taskId = new Realm.BSON.ObjectId(taskToSync.taskId);
    store.write(() => {
      store.create('TaskToSync', { ...taskToSync, id, taskId });
    });
  }

  async deleteById(id: string): Promise<void> {
    const store = await storeInstance.getConnection();
    let taskToSync = await this.findById(id);
    store.write(async () => {
      store.delete(taskToSync);
      taskToSync = undefined;
    });
  }

  close() {
    storeInstance.close();
  }
}
