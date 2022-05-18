import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Content, ButtonText, Loader } from "./styles";

type ButtonProps<T = {}> = T & RectButtonProps & { children: string };

export const DefaultButton = ({
  children,
  enabled,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <Container {...rest}>
      <Content accessibilityLabel="Create" accessibilityRole="button">
        {enabled ? <ButtonText>{children}</ButtonText> : <Loader />}
      </Content>
    </Container>
  );
};
