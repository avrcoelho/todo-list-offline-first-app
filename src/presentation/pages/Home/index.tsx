import { ButtonCreate } from "../../components/Buttons/Create";
import { FormCreate } from "../../components/Forms/Create";
import { ListTasks } from "../../components/Lists/Tasks";
import { useController } from "./useController";
import { Container, Header, Title, BottomSheetContainer } from "./styles";

export const Home = (): JSX.Element => {
  const {
    isOpen,
    bottomSheetRef,
    onHandleCreate,
    onHandleSheetChanges,
    isLoading,
    tasks,
    onSearch,
  } = useController();

  return (
    <Container>
      <Header>
        <Title>Tasks</Title>
      </Header>

      {!!tasks && (
        <ListTasks tasks={tasks} isLoading={isLoading} onSearch={onSearch} />
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
