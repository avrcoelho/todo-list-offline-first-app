import { useEffect } from "react";
import { useNotification } from "react-native-hook-notification";

import { Task } from "../../../../../entities/Task";
import { makeDeleteTask } from "../../../../../main/factories/usecases/deleteTask";
import { useMutation } from "../../../../hooks/useMutation";
import { useStore } from "../../../../store/useStore";

export const useController = (task: Task) => {
  const { isError, isSuccess, mutate, reset } = useMutation(makeDeleteTask);
  const notification = useNotification();

  const onRemoveFromStore = useStore((state) => state.remove);
  const onDelete = (id: string) => {
    mutate(id);
  };

  const onError = () => {
    notification.error({
      text: "Error deleting task",
    });
    reset();
  };

  useEffect(() => {
    if (isError) {
      onError();
    }
  }, [isError, onError]);

  const onSuccess = () => {
    notification.success({
      text: "Task deleted!",
    });
    reset();
    onRemoveFromStore(task._id);
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const onAddTaskIdToUpdate = useStore((state) => state.addTaskIdToUpdate);
  const bottomsheetControls = useStore((state) => state.bottomSheetControls);
  const onOpenUpdate = (id: string) => {
    onAddTaskIdToUpdate(id);
    bottomsheetControls?.expand();
  };

  return {
    onDelete,
    onOpenUpdate,
  };
};
