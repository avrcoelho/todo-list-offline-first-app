import { useCallback, useEffect, useState } from "react";
import { useNotification } from "react-native-hook-notification";

import { makeDeleteTask } from "../../../../../main/factories/usecases/deleteTask";
import { useMutation } from "../../../../hooks/useMutation";

export const useController = () => {
  const { isError, isSuccess, mutate, reset } = useMutation(makeDeleteTask);
  const notification = useNotification();

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
  }, [reset, notification]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return {
    onDelete,
  };
};
