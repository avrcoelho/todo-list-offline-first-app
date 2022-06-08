import { TaskToSync } from "../../entities/TaskToSync";
import { TaskToSyncRepositoryPort } from "../../usecases/ports/TaskToSyncRepository";
import { Store } from "../store";

export class TaskToSyncRepository implements TaskToSyncRepositoryPort {
  async find(): Promise<TaskToSync[]> {
    const store = await Store.init();
    let tasks = store.objects<TaskToSync>("TaskToSync");
    return tasks.map((task) => ({
      _id: task._id,
      type: task.type,
    }));
  }

  async findById(_id: string): Promise<TaskToSync | undefined> {
    const store = await Store.init();
    const _idParsed = new Realm.BSON.ObjectId(_id);
    return store.objectForPrimaryKey<TaskToSync>("TaskToSync", _idParsed);
  }

  async create(taskToSync: TaskToSync): Promise<void> {
    const store = await Store.init();
    const _id = new Realm.BSON.ObjectId();
    store.write(() => {
      store.create("TaskToSync", { ...taskToSync, _id });
    });
  }

  async deleteById(id: string): Promise<void> {
    let taskToSync = await this.findById(id);
    const store = await Store.init();
    store.write(async () => {
      store.delete(taskToSync);
      taskToSync = undefined;
    });
  }
}
