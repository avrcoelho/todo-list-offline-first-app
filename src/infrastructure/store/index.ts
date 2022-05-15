import { TaskSchema } from "./schemas/Task";

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
      schema: [TaskSchema],
    });
  }
}
