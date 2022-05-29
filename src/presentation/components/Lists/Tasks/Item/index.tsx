import { Task } from "../../../../../entities/Task";
import { Options } from "../Options";
import { Container, Content, Name, Status } from "./styles";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Container
      renderRightActions={Options}
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      onEnded={() => console.log(1)}
    >
      <Content>
        <Name>{task.name}</Name>
        <Status>{task.status}</Status>
      </Content>
    </Container>
  );
};
