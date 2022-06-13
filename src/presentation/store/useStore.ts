import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import create from 'zustand';

import { Task } from '../../entities/Task';

type UseStore = {
  tasks: Task[];
  taskIdToUpdate: null | string;
  bottomSheetControls: null | BottomSheetMethods;
  init(tasks: Task[]): void;
  add(task: Task): void;
  update(task: Task): void;
  remove(id: string): void;
  addTaskIdToUpdate(id: string): void;
  removeTaskIdToUpdate(): void;
  setBottomSheetControls(controls: BottomSheetMethods): void;
};

export const useStore = create<UseStore>(set => ({
  tasks: [],
  taskIdToUpdate: null,
  bottomSheetControls: null,
  init: tasks => set({ tasks }),
  add: task => set(state => ({ ...state, tasks: [...state.tasks, task] })),
  update: task =>
    set(state => ({
      ...state,
      tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    })),
  remove: id =>
    set(state => ({
      ...state,
      tasks: state.tasks.filter(task => task.id !== id),
    })),
  addTaskIdToUpdate: id =>
    set(state => ({
      ...state,
      taskIdToUpdate: id,
    })),
  removeTaskIdToUpdate: () =>
    set(state => ({
      ...state,
      taskIdToUpdate: null,
    })),
  setBottomSheetControls: (controls: BottomSheetMethods) =>
    set(state => ({
      ...state,
      bottomSheetControls: controls,
    })),
}));
