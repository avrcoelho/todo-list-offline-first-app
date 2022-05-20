import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Content, ButtonText, Loader } from "./styles";

type ButtonProps<T = {}> = T &
  RectButtonProps & { children: string; isLoading?: boolean };

export const DefaultButton = ({
  children,
  isLoading = false,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <Container $isLoading={isLoading} {...rest}>
      <Content accessibilityLabel="Create" accessibilityRole="button">
        {isLoading ? <Loader /> : <ButtonText>{children}</ButtonText>}
      </Content>
    </Container>
  );
};
