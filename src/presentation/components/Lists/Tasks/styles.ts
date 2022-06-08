import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';

import { Task } from '../../../../entities/Task';

export const Container = styled(
  FlatList as new (props: FlatListProps<Task>) => FlatList<Task>,
)``;
