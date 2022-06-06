import Realm from "realm";
import { TaskSchema } from "./schemas/Task";
import { TaskToSyncSchema } from "./schemas/TaskToSync";

export class Store {
  static async init() {
    return Realm.open({
      path: "mylocalDatabase",
      schema: [TaskSchema, TaskToSyncSchema],
    });
  }
}
