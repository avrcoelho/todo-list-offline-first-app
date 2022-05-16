export const TaskSchema = {
  name: "Task",
  properties: {
    _id: "objectId",
    taskId: "string",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};
