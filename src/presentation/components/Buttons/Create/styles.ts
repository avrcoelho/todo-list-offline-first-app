import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
})`
  width: 60px;
  height: 60px;
  background-color: #00ed64;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
