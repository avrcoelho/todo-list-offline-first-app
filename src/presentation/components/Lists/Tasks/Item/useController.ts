import { useCallback, useEffect } from "react";
import { useNotification } from "react-native-hook-notification";

import { Task } from "../../../../../entities/Task";
import { makeDeleteTask } from "../../../../../main/factories/usecases/deleteTask";
import { useMutation } from "../../../../hooks/useMutation";
import { useTaskStore } from "../../../../store/task";

export const useController = (task: Task) => {
  const { isError, isSuccess, mutate, reset } = useMutation(makeDeleteTask);
  const notification = useNotification();

  const onRemoveFromStore = useTaskStore((state) => state.remove);
  const onDelete = useCallback(
    (id: string) => {
      mutate(id);
    },
    [mutate]
  );

  const onError = useCallback(() => {
    notification.error({
      text: "Error deleting task",
    });
    reset();
  }, [reset, notification]);

  useEffect(() => {
    if (isError) {
      onError();
    }
  }, [isError, onError]);

  const onSuccess = useCallback(() => {
    notification.success({
      text: "Task deleted!",
    });
    reset();
    onRemoveFromStore(task._id);
  }, [reset, notification, task._id]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const onAddTaskIdToUpdate = useTaskStore((state) => state.addTaskIdToUpdate);
  const onOpenUpdate = useCallback(
    (id: string) => {
      onAddTaskIdToUpdate(id);
    },
    [onAddTaskIdToUpdate]
  );

  return {
    onDelete,
    onOpenUpdate,
  };
};
