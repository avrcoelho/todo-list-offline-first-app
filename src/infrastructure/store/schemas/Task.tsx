export const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    localStatus: "string?",
  },
  primaryKey: "_id",
};
