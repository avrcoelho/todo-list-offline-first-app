import React, { useEffect, useState } from "react";

import { Container, Title, Field, Label, Buttom } from "./styles";

type Option = {
  label: string;
  value: string | number;
};

type InputRadioProps = {
  options: Option[];
  onChange(prop: any): void;
  value: string | number;
  label?: string;
};

export const InputRadio = ({
  label,
  options,
  value,
  onChange,
}: InputRadioProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<string | number>();

  useEffect(() => {
    setSelectedOption(value);
    onChange(value);
  }, [value]);

  const onSelectOption = (option: string | number) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Container>
      {!!label && <Title>{label}</Title>}

      {options.map((option) => (
        <Field>
          <Buttom
            $isSelected={option.value === selectedOption}
            onPress={() => onSelectOption(option.value)}
          />
          <Label>{option.label}</Label>
        </Field>
      ))}
    </Container>
  );
};
