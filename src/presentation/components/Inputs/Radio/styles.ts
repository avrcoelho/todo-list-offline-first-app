import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const Field = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

type ButtomProps = {
  $isSelected: boolean;
};

export const Buttom = styled.TouchableOpacity<ButtomProps>`
  height: 28px;
  width: 28px;
  border-radius: 14px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${({ $isSelected }) => ($isSelected ? "#00ed64" : "#ccc")};
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #333;
`;
