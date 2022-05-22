import { useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNotification } from "react-native-hook-notification";

import { makeGetTasks } from "../../../main/factories/usecases/getTasks";
import { useQuery } from "../../hooks/useQuery";

export const useController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onHandleSheetChanges = (index: number) => {
    setIsOpen(!!index);
  };

  const onHandleCreate = () => {
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  };

  const { isError, isLoading, data } = useQuery(() => makeGetTasks());
  const notification = useNotification();
  useEffect(() => {
    if (isError) {
      notification.error({
        text: "Getting tasks error!",
      });
    }
  }, [isError, notification]);

  return {
    isOpen,
    bottomSheetRef,
    onHandleSheetChanges,
    onHandleCreate,
    isLoading,
    tasks: data,
  };
};
