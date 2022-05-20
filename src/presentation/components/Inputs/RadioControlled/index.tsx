import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { InputRadioOption } from "../../../types/InputRadioOption";
import { InputRadio } from "../Radio";

type InputRadioControlledProps = Omit<TextInputProps, "accessibilityRole"> & {
  options: InputRadioOption[];
  name: string;
  control: Control<any>;
  label?: string;
};

export const InputRadioControlled = ({
  control,
  name,
  ...restProps
}: InputRadioControlledProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputRadio {...restProps} onChange={onChange} value={value} />
      )}
    />
  );
};
