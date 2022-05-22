import { memo } from "react";

import { Task } from "../../../../entities/Task";
import { LoaderFooterList } from "../../Loaders/FooterList";
import { TaskItem } from "./Item";
import { Container } from "./styles";

type ListTasksProps = {
  tasks: Task[];
  isRefreshing: boolean;
  isLoading: boolean;
  onRefresh(): void;
  onEndReached(): void;
};

const Component = ({
  tasks,
  isLoading,
  isRefreshing,
  onRefresh,
  onEndReached,
}: ListTasksProps): JSX.Element => {
  return (
    <Container
      keyExtractor={(task) => task._id}
      data={tasks}
      renderItem={({ item: task }) => <TaskItem task={task} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
      ListFooterComponent={<LoaderFooterList isLoading={isLoading} />}
    />
  );
};

export const ListTasks = memo(Component);
