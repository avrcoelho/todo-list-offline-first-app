import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNotification } from "react-native-hook-notification";

import { makeGetTasks } from "../../../main/factories/usecases/getTasks";
import { useQuery } from "../../hooks/useQuery";
import { Task } from "../../../entities/Task";

export const useController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSerachValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onHandleSheetChanges = (index: number) => {
    setIsOpen(!!index);
  };

  const onHandleCreate = () => {
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  };

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

  useEffect(() => {
    if (isSuccess && data) {
      (data as any).addListener(() => {
        setTasks([...data]);
      });
    }
  }, [isSuccess, data]);

  const onSearch = useCallback(
    (value: string) => {
      setSerachValue(value);
      setTimeout(() => {
        refetch();
      }, 500);
    },
    [refetch]
  );

  return {
    isOpen,
    bottomSheetRef,
    onHandleSheetChanges,
    onHandleCreate,
    isLoading,
    tasks,
    onSearch,
  };
};
