import BottomSheet from "@gorhom/bottom-sheet";

import { Status } from "../../../constants/Status";
import { DefaultButton } from "../../Buttons/Default";
import { InputTextControlled } from "../../Inputs/TextControlled";
import { InputRadioControlled } from "../../Inputs/RadioControlled";
import { useController } from "./useController";
import { Container, Title } from "./styles";

type FormCreateProps = {
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
};

export const FormCreate = ({
  bottomSheetRef,
}: FormCreateProps): JSX.Element => {
  const { control, errors, handleSubmit, onSumit, isLoading, taskIdToUpdate } =
    useController({
      bottomSheetRef,
    });

  return (
    <Container>
      <Title>{taskIdToUpdate ? "Update" : "Create"} task</Title>

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

      <DefaultButton onPress={handleSubmit(onSumit)} isLoading={isLoading}>
        Create
      </DefaultButton>
    </Container>
  );
};
