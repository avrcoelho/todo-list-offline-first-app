import { DefaultButton } from "../../Buttons/Default";
import { InputText } from "../../Inputs/Text";
import { Container } from "./styles";

export const FormCreate = () => {
  return (
    <Container>
      <InputText label="Name" />

      <DefaultButton enabled>Create</DefaultButton>
    </Container>
  );
};
