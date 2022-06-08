import { useEffect, useState } from 'react';

import { InputRadioOption } from '../../../types/InputRadioOption';
import { Container, Title, Field, Label, Circle } from './styles';

type InputRadioProps = {
  options: InputRadioOption[];
  onChange(prop: string | number): void;
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
    setSelectedOption(value || options[0].value);
    onChange(value || options[0].value);
  }, [onChange, options, value]);

  const onSelectOption = (option: string | number) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Container>
      {!!label && <Title>{label}</Title>}

      {options.map(option => (
        <Field
          key={String(option.value)}
          onPress={() => onSelectOption(option.value)}
          activeOpacity={1}
        >
          <Circle $isSelected={option.value === selectedOption} />
          <Label>{option.label}</Label>
        </Field>
      ))}
    </Container>
  );
};
