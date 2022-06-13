export interface TaskToSync {
  id: string;
  type: 'deleted' | 'updated' | 'created';
}
