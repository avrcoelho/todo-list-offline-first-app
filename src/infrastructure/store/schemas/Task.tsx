export const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    name: 'string',
    status: 'string?',
  },
  primaryKey: '_id',
};
