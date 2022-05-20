import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createValidator } from "../../../validators/createTask";
import { Status } from "../../../constants/Status";
import { DefaultButton } from "../../Buttons/Default";
import { InputTextControlled } from "../../Inputs/TextControlled";
import { InputRadioControlled } from "../../Inputs/RadioControlled";
import { Container } from "./styles";

type FormData = {
  name: string;
};

export const FormCreate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createValidator),
  });

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <Container>
      <InputTextControlled
        name="name"
        label="Name"
        control={control}
        error={errors.name?.message}
      />
      <InputRadioControlled
        name="status"
        label="Status"
        control={control}
        error={errors.name?.message}
        options={Status}
      />

      <DefaultButton onPress={handleSubmit(onSubmit)}>Create</DefaultButton>
    </Container>
  );
};
