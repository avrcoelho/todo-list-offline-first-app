import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 0 10px;
  margin: 10px 0 14px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 34px;
  flex-direction: row;
  align-items: center;
  border-radius: 17px;
  background-color: #eee;
  padding: 0 10px;
`;

export const Input = styled.TextInput`
  height: 100%;
  flex: 1;
  padding: 0 6px;
  font-size: 16px;
  color: #666;
`;

export const ButtonClear = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  background-color: #ccc;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.ActivityIndicator``;

export const AmountLabel = styled.Text`
  font-size: 13px;
  margin-left: auto;
  margin-top: 8px;
  color: #001e2b;
`;
