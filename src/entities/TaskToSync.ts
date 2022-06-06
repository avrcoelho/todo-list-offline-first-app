export interface Task {
  _id: string;
  type: "deleted" | "updated" | "created";
}
