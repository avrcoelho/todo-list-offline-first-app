import { Text } from "react-native";

import { ButtonCreate } from "../../components/Buttons/Create";
import { useController } from "./useController";
import { Container, BottomSheetContent, BottomSheetContainer } from "./styles";

export const Home = (): JSX.Element => {
  const { isOpen, bottomSheetRef, onHandleCreate, onHandleSheetChanges } =
    useController();

  return (
    <Container>
      <ButtonCreate onPress={onHandleCreate} />

      <BottomSheetContainer
        ref={bottomSheetRef}
        index={0}
        snapPoints={[1, 300]}
        onChange={onHandleSheetChanges}
        $isOpen={isOpen}
      >
        <BottomSheetContent>
          <Text>Awesome 🎉</Text>
        </BottomSheetContent>
      </BottomSheetContainer>
    </Container>
  );
};
