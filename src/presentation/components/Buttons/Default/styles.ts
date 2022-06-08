import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

type ContainerProps = {
  $isLoading: boolean;
};

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: 50px;
  background-color: #00ed64;
  border-radius: 10px;
  margin-top: 14px;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.6 : 1)};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #001e2b;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#001E2B',
})``;
