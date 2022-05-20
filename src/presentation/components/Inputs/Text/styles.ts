import styled from "styled-components/native";

export const Container = styled.View`
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
`;

type InputProps = {
  $isFocused: boolean;
};

export const Input = styled.TextInput<InputProps>`
  flex: 1;
  border-bottom-width: 2px;
  border-bottom-color: ${({ $isFocused }) => ($isFocused ? "#00ed64" : "#ccc")};
  font-size: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const Error = styled.Text``;
