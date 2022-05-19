import { useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export const useController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onHandleSheetChanges = (index: number) => {
    setIsOpen(!!index);
  };

  const onHandleCreate = () => {
    setIsOpen(true);
    bottomSheetRef.current.expand();
  };

  return {
    isOpen,
    bottomSheetRef,
    onHandleSheetChanges,
    onHandleCreate,
  };
};
