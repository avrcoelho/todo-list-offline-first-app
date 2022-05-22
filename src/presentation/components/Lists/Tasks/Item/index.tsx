import { Task } from "../../../../../entities/Task";
import { Container, Name, Status } from "./styles";

export const TaskItem = ({ name, status }: Task) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Status>{status}</Status>
    </Container>
  );
};
