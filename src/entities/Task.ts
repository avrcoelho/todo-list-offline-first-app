export interface Task {
  id: string;
  name: string;
  status: "solved" | "not solved";
  localStatus: "created" | "updated" | "detected";
}
