import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNotification } from "react-native-hook-notification";

import { makeGetTasks } from "../../../main/factories/usecases/getTasks";
import { useQuery } from "../../hooks/useQuery";
import { useStore } from "../../store/useStore";

export const useController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSerachValue] = useState("");
  const bottomSheetRef = useRef<BottomSheetMethods>();
  const tasks = useStore((state) => state.tasks);

  const removeTaskIdToUpdate = useStore((state) => state.removeTaskIdToUpdate);
  const onHandleSheetChanges = useCallback(
    (index: number) => {
      const isOpened = !!index;
      setIsOpen(isOpened);
      if (!isOpened) {
        removeTaskIdToUpdate();
      }
    },
    [removeTaskIdToUpdate]
  );

  const taskIdToUpdate = useStore((state) => state.taskIdToUpdate);
  useEffect(() => {
    if (taskIdToUpdate) {
      setIsOpen(true);
    }
  }, [taskIdToUpdate]);

  const onHandleCreate = useCallback(() => {
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  }, []);

  const { isError, isSuccess, isLoading, data, refetch } = useQuery(() =>
    makeGetTasks({ name: searchValue })
  );
  const notification = useNotification();
  useEffect(() => {
    if (isError) {
      notification.error({
        text: "Getting tasks error!",
      });
    }
  }, [isError, notification]);

  const initTasks = useStore((state) => state.init);
  useEffect(() => {
    const canInit = isSuccess && data;
    if (canInit) {
      initTasks(data);
    }
  }, [isSuccess, data, initTasks]);

  const onSearch = useCallback(
    (value: string) => {
      setSerachValue(value);
      setTimeout(() => {
        refetch();
      }, 500);
    },
    [refetch]
  );

  const setBottomSheetControls = useStore(
    (state) => state.setBottomSheetControls
  );
  const onSetBottomSheetRef = useCallback((ref: BottomSheetMethods) => {
    bottomSheetRef.current = ref;
    setBottomSheetControls(ref);
  }, []);

  return {
    isOpen,
    onSetBottomSheetRef,
    onHandleSheetChanges,
    onHandleCreate,
    isLoading,
    tasks,
    onSearch,
  };
};
