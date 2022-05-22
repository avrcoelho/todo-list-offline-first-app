export interface Task {
  _id: string;
  name: string;
  status: "resolved" | "unresolved";
}
