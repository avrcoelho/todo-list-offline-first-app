export interface Task {
  _id: number;
  name: string;
  status: "solved" | "not solved";
  localStatus: "created" | "updated" | "detected";
}
