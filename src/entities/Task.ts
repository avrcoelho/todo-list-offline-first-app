export interface Task {
  id: string;
  name: string;
  status: 'resolved' | 'unresolved';
}
