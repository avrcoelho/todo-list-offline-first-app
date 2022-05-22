import { ButtonCreate } from "../../components/Buttons/Create";
import { FormCreate } from "../../components/Forms/Create";
import { useController } from "./useController";
import { ListTasks } from "../../components/Lists/Tasks";
import { Container, BottomSheetContainer } from "./styles";

export const Home = (): JSX.Element => {
  const {
    isOpen,
    bottomSheetRef,
    onHandleCreate,
    onHandleSheetChanges,
    isLoading,
    tasks,
  } = useController();

  return (
    <Container>
      {!!tasks && (
        <ListTasks
          tasks={tasks}
          isLoading={isLoading}
          isRefreshing={false}
          onEndReached={() => {}}
          onRefresh={() => {}}
        />
      )}
      <ButtonCreate onPress={onHandleCreate} />

      <BottomSheetContainer
        ref={bottomSheetRef}
        index={0}
        snapPoints={[1, 340]}
        onChange={onHandleSheetChanges}
        $isOpen={isOpen}
      >
        <FormCreate bottomSheetRef={bottomSheetRef} />
      </BottomSheetContainer>
    </Container>
  );
};
