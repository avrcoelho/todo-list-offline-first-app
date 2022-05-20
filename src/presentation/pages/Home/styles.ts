import styled, { css } from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

type BottomSheetProps = {
  $isOpen: boolean;
};

const bottomSheetBorder = css`
  border-top-width: 1px;
  border-top-color: #ccc;
`;

export const BottomSheetContainer = styled(BottomSheet)<BottomSheetProps>`
  ${({ $isOpen }) => $isOpen && bottomSheetBorder}
`;
