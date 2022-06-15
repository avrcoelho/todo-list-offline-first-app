import Realm from 'realm';
import { TaskSchema } from './schemas/Task';
import { TaskToSyncSchema } from './schemas/TaskToSync';

export class Store {
  private static instance: Store;

  private connection: Realm | null;

  private constructor() {
    this.connection = null;
  }

  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  async getConnection() {
    if (this.connection) {
      return this.connection;
    }
    return Realm.open({
      schema: [TaskSchema, TaskToSyncSchema],
    });
  }

  close() {
    this.connection?.close();
    this.connection = null;
  }
}
