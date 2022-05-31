import create from "zustand";

import { Task } from "../../entities/Task";

type UseTaskStore = {
  tasks: Task[];
  init(tasks: Task[]): void;
  add(task: Task): void;
  update(task: Task): void;
  remove(_id: string): void;
};

export const useTaskStore = create<UseTaskStore>((set) => ({
  tasks: [],
  init: (tasks) => set({ tasks }),
  add: (task) => set((state) => ({ ...state, tasks: [...state.tasks, task] })),
  update: (task) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
    })),
  remove: (_id) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.filter((task) => task._id !== _id),
    })),
}));
