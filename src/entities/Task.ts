export interface Task {
  _id: string;
  name: string;
  status: "solved" | "not solved";
}
