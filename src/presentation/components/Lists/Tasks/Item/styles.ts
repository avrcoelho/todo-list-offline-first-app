import styled from "styled-components/native";

export const Container = styled.View`
  min-height: 76px;
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-color: #ccc;

  padding: 0 10px;
`;

export const Name = styled.Text.attrs({
  ellipsizeMode: "tail",
  numberOfLines: 2,
})`
  color: #001e2b;
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: bold;
`;

export const Status = styled.Text`
  color: #999;
  font-size: 14px;
  text-transform: capitalize;
`;
