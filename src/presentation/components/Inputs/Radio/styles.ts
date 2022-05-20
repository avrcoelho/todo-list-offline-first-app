import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #001e2b;
  margin-bottom: 12px;
`;

export const Field = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

type ButtomProps = {
  $isSelected: boolean;
};

const selectedStyle = css`
  border-color: #00ed64;
  background-color: #00ed64;
`;

export const Buttom = styled.TouchableOpacity<ButtomProps>`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  margin-right: 8px;
  border-width: 1px;
  border-color: #ccc;
  background-color: transparent;

  ${({ $isSelected }) => $isSelected && selectedStyle};
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #333;
`;
