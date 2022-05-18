import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  height: 60;
  background-color: #00ed64;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  margin-top: 14;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.6)};
`;

export const Content = styled.View`
  flex: 1;
`;

export const ButtonText = styled.Text`
  color: #001e2b;
  font-size: 16;
  font-weight: bold;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: "small",
  color: "#001E2B",
})``;
