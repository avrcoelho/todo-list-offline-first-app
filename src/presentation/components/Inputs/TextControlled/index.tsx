import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { InputText } from '../Text';

type InputTextControlledProps = Omit<TextInputProps, 'accessibilityRole'> & {
  name: string;
  control: Control<any>;
  error?: string;
  label?: string;
};

export const InputTextControlled = ({
  control,
  name,
  ...restProps
}: InputTextControlledProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputText {...restProps} onChangeText={onChange} value={value} />
      )}
    />
  );
};
