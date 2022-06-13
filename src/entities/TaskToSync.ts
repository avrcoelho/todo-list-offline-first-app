export interface TaskToSync {
  id: string;
  taskId: string;
  type: 'deleted' | 'updated' | 'created';
}
