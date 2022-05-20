import styled, { css } from "styled-components/native";

export const Container = styled.View`
  min-height: 60px;
  width: 100%;
  margin-bottom: 20px;
`;

type InputProps = {
  $isFocused: boolean;
  $isErrored: boolean;
};

const isErroredStyle = css`
  border-bottom-color: #f00;
`;
const isFocusedStyle = css`
  border-bottom-color: #00ed64;
`;

export const Input = styled.TextInput<InputProps>`
  min-height: 40px;
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: #ccc;
  font-size: 16px;
  color: #666;

  ${({ $isFocused }) => $isFocused && isFocusedStyle}
  ${({ $isErrored }) => $isErrored && isErroredStyle}
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #001e2b;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: #f00;
`;
