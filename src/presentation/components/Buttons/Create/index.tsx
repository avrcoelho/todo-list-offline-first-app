import { RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

type ButtonProps<T = {}> = T & RectButtonProps;

export const ButtonCreate = (props: ButtonProps): JSX.Element => {
  return (
    <Container {...props}>
      <Feather name="plus" size={32} color="#001E2B" />
    </Container>
  );
};
