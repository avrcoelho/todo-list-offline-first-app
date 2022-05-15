import { Task } from "../../entities/Task";
import { Store } from "../store";

const storeInstance = Store.getInstance();

export class TaskRepository {
  async find() {
    const store = await storeInstance.init();
    return store.objects<Task[]>("Tasks");
  }

  async findById(id: number) {
    const store = await storeInstance.init();
    return store.objectForPrimaryKey<Task>("Tasks", id);
  }
}
