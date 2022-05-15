import Realm from "realm";
import { TaskSchema } from "./schemas/Task";
import { TaskLocalUpdatedSchema } from "./schemas/TaskLocalUpdated";

export class Store {
  private static instance: Store;

  private realm: Realm;

  private constructor() {}

  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  async init() {
    if (!!this.realm) {
      return this.realm;
    }
    return Realm.open({
      path: "mylocalDB",
      schema: [TaskSchema, TaskLocalUpdatedSchema],
    });
  }
}
