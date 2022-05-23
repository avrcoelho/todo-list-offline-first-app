import styled, { css } from "styled-components/native";
import BottomSheet from "@gorhom/bottom-sheet";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

type BottomSheetProps = {
  $isOpen: boolean;
};

export const Header = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;

  padding-left: 10px;

  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Title = styled.Text`
  font-size: 26px;
  color: #001e2b;
  font-weight: bold;
  text-align: center;
`;

const bottomSheetBorder = css`
  border-top-width: 1px;
  border-top-color: #ccc;
`;

export const BottomSheetContainer = styled(BottomSheet)<BottomSheetProps>`
  ${({ $isOpen }) => $isOpen && bottomSheetBorder}
`;
