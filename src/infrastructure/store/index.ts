import Realm from "realm";
import { TaskSchema } from "./schemas/Task";
import { TaskLocalUpdatedSchema } from "./schemas/TaskLocalUpdated";

export class Store {
  static async init() {
    return Realm.open({
      path: "mylocalDatabase",
      schema: [TaskSchema, TaskLocalUpdatedSchema],
    });
  }
}
