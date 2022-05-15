export const TaskSchema = {
  name: "Task",
  properties: {
    id: "uuid",
    name: "string",
    status: "string?",
  },
  primaryKey: "id",
};
