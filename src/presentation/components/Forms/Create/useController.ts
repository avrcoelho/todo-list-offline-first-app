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
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createValidator),
  });

  const taskIdToUpdate = useStore((state) => state.taskIdToUpdate);
  const taskToUpdate = useStore((state) =>
    state.tasks.find((task) => task._id === taskIdToUpdate)
  );

  const onSetValue = (taskValues?: Task) => {
    setValue("name", taskValues?.name || "");
    setValue("status", taskValues?.status || "resolved");
  };

  useEffect(() => {
    onSetValue(taskToUpdate);
  }, [taskToUpdate]);

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
  }, [isError]);

  const bottomsheetControls = useStore((state) => state.bottomSheetControls);
  const removeTaskIdToUpdate = useStore((state) => state.removeTaskIdToUpdate);
  const onSuccess = () => {
    notification.success({
      text: `Task ${taskIdToUpdate ? "updated" : "created"}!`,
    });
    Keyboard.dismiss();
    bottomsheetControls?.close();
    reset();
    resetForm();
    removeTaskIdToUpdate();
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

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
    const taskData = await mutate({ _id: taskIdToUpdate, ...formData } as Task);
    if (taskData) {
      updateStore(taskData);
    }
  };

  return {
    control,
    handleSubmit,
    onSumit,
    errors,
    isLoading,
    taskIdToUpdate,
    taskToUpdate,
  };
};
