import styled from "styled-components/native";
import { Swipeable } from "react-native-gesture-handler";

export const Container = styled(Swipeable).attrs({
  childrenContainerStyle: {
    minHeight: 60,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
})``;

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
