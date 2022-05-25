import { memo } from "react";

import { Task } from "../../../../entities/Task";
import { LoaderFooterList } from "../../Loaders/FooterList";
import { ListTaskHeader } from "./Header";
import { TaskItem } from "./Item";
import { Container } from "./styles";

type ListTasksProps = {
  tasks: Task[];
  isLoading: boolean;
  onSearch(value: string): void;
};

const Component = ({
  tasks,
  isLoading,
  onSearch,
}: ListTasksProps): JSX.Element => {
  return (
    <Container
      keyExtractor={(task) => task._id}
      data={tasks}
      renderItem={({ item: task }) => <TaskItem task={task} />}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <ListTaskHeader
          isLoading={isLoading}
          onSearch={onSearch}
          amount={tasks.length}
        />
      }
      ListFooterComponent={<LoaderFooterList isLoading={isLoading} />}
    />
  );
};

export const ListTasks = memo(Component);
