/* eslint-disable react/destructuring-assignment */
import { Container, Content, Text } from './styles';

export const Options = (_: any, dragAnimatedValue: any) => {
  const scale = dragAnimatedValue.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <Content style={{ transform: [{ scale }] }}>
        <Text>Delete</Text>
      </Content>
    </Container>
  );
};
