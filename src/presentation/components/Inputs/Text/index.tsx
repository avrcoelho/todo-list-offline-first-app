import { useState } from "react";
import { TextInputProps } from "react-native";

import { Container, Input, Label, Error } from "./styles";

type InputTextProps = Omit<TextInputProps, "accessibilityRole"> & {
  error?: string;
  label?: string;
};

export const InputText = ({
  label,
  error,
  ...restInputProps
}: InputTextProps): JSX.Element => {
  const [isFocused, setIsFocusec] = useState(false);

  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <Input
        underlineColorAndroid="transparent"
        disableFullscreenUI
        {...restInputProps}
        onFocus={() => setIsFocusec(true)}
        onBlur={() => setIsFocusec(false)}
        $isFocused={isFocused}
        $isErrored={!!error}
      />
      {!!error && <Error>{error}</Error>}
    </Container>
  );
};
