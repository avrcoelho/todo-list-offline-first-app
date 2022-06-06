export interface TaskToSync {
  _id: string;
  type: "deleted" | "updated" | "created";
}
