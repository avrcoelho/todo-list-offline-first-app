import styled from "styled-components/native";
import { Animated, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  background-color: #dd2c00;
  align-items: center;
  flex-direction: ${I18nManager.isRTL ? "row-reverse" : "row"};
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled(Animated.View)`
  margin: 0 10px;
  height: 100%;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
