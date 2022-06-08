import { Container, Content, ButtonText, Loader } from './styles';

type ButtonProps = { onPress(): any; children: string; isLoading?: boolean };

export const DefaultButton = ({
  children,
  onPress,
  isLoading = false,
}: ButtonProps): JSX.Element => {
  return (
    <Container onPress={onPress} $isLoading={isLoading} enabled={!isLoading}>
      <Content accessibilityLabel="Create" accessibilityRole="button">
        {isLoading ? <Loader /> : <ButtonText>{children}</ButtonText>}
      </Content>
    </Container>
  );
};
