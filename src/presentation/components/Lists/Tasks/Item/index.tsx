import { memo } from "react";
import { Task } from "../../../../../entities/Task";
import { Options } from "../Options";
import { Container, Content, Name, Status } from "./styles";
import { useController } from "./useController";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { onDelete } = useController();

  return (
    <Container
      renderRightActions={Options}
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={70}
      onSwipeableOpen={() => onDelete(task._id)}
    >
      <Content>
        <Name>{task.name}</Name>
        <Status>{task.status}</Status>
      </Content>
    </Container>
  );
};
