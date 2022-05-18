import { TextInputProps } from "react-native";
import { UseFormRegisterReturn } from "react-hook-form";

import { Container, Input, Label, Error } from "./styles";

type InputTextProps = Omit<TextInputProps, "accessibilityRole"> & {
  register?: UseFormRegisterReturn | {};
  error?: string;
  label?: string;
};

export const InputText = ({
  register,
  label,
  error,
  ...restInputProps
}: InputTextProps): JSX.Element => {
  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <Input
        underlineColorAndroid="transparent"
        disableFullscreenUI
        {...register}
        {...restInputProps}
      />
      {!!error && <Error>{error}</Error>}
    </Container>
  );
};
