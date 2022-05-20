import { useForm } from "react-hook-form";
import { DefaultButton } from "../../Buttons/Default";
import { InputTextControlled } from "../../Inputs/TextControlled";
import { Container } from "./styles";

type FormData = {
  name: string;
};

export const FormCreate = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <Container>
      <InputTextControlled name="name" label="Name" control={control} />

      <DefaultButton onPress={handleSubmit(onSubmit)}>Create</DefaultButton>
    </Container>
  );
};
