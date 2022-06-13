export const TaskSchema = {
  name: 'Task',
  properties: {
    id: 'objectId',
    name: 'string',
    status: 'string?',
  },
  primaryKey: 'id',
};
