import Realm from 'realm';
import { TaskSchema } from './schemas/Task';
import { TaskToSyncSchema } from './schemas/TaskToSync';

export abstract class Store {
  protected async init() {
    return Realm.open({
      path: 'DB',
      schema: [TaskSchema, TaskToSyncSchema],
    });
  }
}
