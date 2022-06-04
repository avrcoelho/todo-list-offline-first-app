import { ButtonCreate } from "../../components/Buttons/Create";
import { FormCreate } from "../../components/Forms/Create";
import { ListTasks } from "../../components/Lists/Tasks";
import { useController } from "./useController";
import { Container, Header, Title, BottomSheetContainer } from "./styles";

export const Home = (): JSX.Element => {
  const {
    isOpen,
    onSetBottomSheetRef,
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

      <ListTasks
        tasks={tasks || []}
        isLoading={isLoading}
        onSearch={onSearch}
      />

      <ButtonCreate onPress={onHandleCreate} />

      <BottomSheetContainer
        ref={onSetBottomSheetRef}
        index={0}
        snapPoints={[1, 340]}
        onChange={onHandleSheetChanges}
        $isOpen={isOpen}
      >
        <FormCreate />
      </BottomSheetContainer>
    </Container>
  );
};
