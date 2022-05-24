import React, { useState, useTransition } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  InputContainer,
  Input,
  ButtonClear,
  Loader,
  AmountLabel,
} from "./styles";

interface InputSearchProps {
  isLoading: boolean;
  onChange(value: string): void;
  amount?: number;
}

export const InputSearch = ({
  isLoading,
  amount,
  onChange,
}: InputSearchProps): JSX.Element => {
  const [value, setValue] = useState("");
  const [, startTransition] = useTransition();

  const onClearSearch = (): void => {
    setValue("");
  };

  const onChangeInputText = (text: string): void => {
    setValue(text);
    startTransition(() => {
      onChange(text);
    });
  };

  const amountIsNumber = typeof amount === "number";

  return (
    <Container>
      <InputContainer>
        <MaterialIcons name="search" color="#ccc" size={26} />

        <Input
          value={value}
          onChangeText={onChangeInputText}
          placeholder="Search..."
          placeholderTextColor="#b8b8b8"
          underlineColorAndroid="transparent"
        />

        {!!value && (
          <>
            {!isLoading ? (
              <Loader size="small" color="#00ed64" testID="loader" />
            ) : (
              <ButtonClear
                activeOpacity={0.6}
                onPress={onClearSearch}
                testID="btn-clear"
              >
                <MaterialIcons name="close" color="#fff" size={20} />
              </ButtonClear>
            )}
          </>
        )}
      </InputContainer>
      {amountIsNumber && <AmountLabel>{amount} tasks</AmountLabel>}
    </Container>
  );
};
