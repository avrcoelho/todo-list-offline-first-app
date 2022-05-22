import styled from "styled-components/native";

export const Container = styled.View`
  min-height: 60px;
  width: 100%;

  padding: 0 10px;
`;

export const Content = styled.View`
  flex: 1
  justify-content: center;

  border-bottom-width: 1px;
  border-bottom-color: #eee;

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
  color: #666;
  font-size: 14px;
  text-transform: capitalize;
`;
