import { Task } from "../../../../../entities/Task";
import { Container, Content, Name, Status } from "./styles";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Container>
      <Content>
        <Name>{task.name}</Name>
        <Status>{task.status}</Status>
      </Content>
    </Container>
  );
};
