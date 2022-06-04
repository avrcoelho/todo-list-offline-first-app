import { useEffect } from "react";
import { Keyboard } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "react-native-hook-notification";

import { Task } from "../../../../entities/Task";
import { makeCreateTask } from "../../../../main/factories/usecases/createTask";
import { createValidator } from "../../../validators/createTask";
import { useMutation } from "../../../hooks/useMutation";
import { useStore } from "../../../store/useStore";
import { makeUpdateTask } from "../../../../main/factories/usecases/updateTask";

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

  const taskIdToUpdate = useStore((state) => state.taskIdToUpdate);
  const { isError, isLoading, isSuccess, mutate, reset } = useMutation(
    taskIdToUpdate ? makeUpdateTask : makeCreateTask
  );
  const notification = useNotification();

  const onError = () => {
    notification.error({
      text: `Error ${taskIdToUpdate ? "updating" : "creating"} task!`,
    });
    reset();
  };

  useEffect(() => {
    if (isError) {
      onError();
    }
  }, [isError, onError]);

  const bottomsheetControls = useStore((state) => state.bottomSheetControls);
  const onSuccess = () => {
    notification.success({
      text: `Task ${taskIdToUpdate ? "updated" : "created"}!`,
    });
    Keyboard.dismiss();
    bottomsheetControls?.close();
    reset();
    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const addTaskToStore = useStore((state) => state.add);
  const updateTaskToStore = useStore((state) => state.update);

  const updateStore = (taskData: Task) => {
    if (taskIdToUpdate) {
      updateTaskToStore(taskData);
    } else {
      addTaskToStore(taskData);
    }
  };

  const onSumit = async (formData: FormData) => {
    const taskData = await mutate(formData as Task);
    if (taskData) {
      updateStore(taskData);
    }
  };

  return { control, handleSubmit, onSumit, errors, isLoading, taskIdToUpdate };
};
