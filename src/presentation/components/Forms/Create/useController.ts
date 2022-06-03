import { useCallback, useEffect } from "react";
import { Keyboard } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "react-native-hook-notification";
import BottomSheet from "@gorhom/bottom-sheet";

import { Task } from "../../../../entities/Task";
import { makeCreateTask } from "../../../../main/factories/usecases/createTask";
import { createValidator } from "../../../validators/createTask";
import { useMutation } from "../../../hooks/useMutation";
import { useStore } from "../../../store/useStore";

type FormData = Omit<Task, "_id">;

export const useController = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createValidator),
  });
  const { isError, isLoading, isSuccess, mutate, reset } =
    useMutation(makeCreateTask);
  const notification = useNotification();

  const onError = useCallback(() => {
    notification.error({
      text: "Error creating task",
    });
    reset();
  }, [reset, notification]);

  useEffect(() => {
    if (isError) {
      onError();
    }
  }, [isError, onError]);

  const bottomsheetControls = useStore((state) => state.bottomSheetControls);
  const onSuccess = useCallback(() => {
    notification.success({
      text: "Task created!",
    });
    Keyboard.dismiss();
    bottomsheetControls?.close();
    reset();
    resetForm();
  }, [reset, notification, bottomsheetControls, resetForm]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const addTaskToStore = useStore((state) => state.add);
  const onSumit = useCallback(
    async (formData: FormData) => {
      const taskCreated = await mutate(formData);
      if (taskCreated) {
        addTaskToStore(taskCreated);
      }
    },
    [mutate, addTaskToStore]
  );

  const taskIdToUpdate = useStore((state) => state.taskIdToUpdate);

  return { control, handleSubmit, onSumit, errors, isLoading, taskIdToUpdate };
};
