import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

interface LoaderFooterListProps {
  isLoading: boolean;
}

export const LoaderFooterList = ({
  isLoading,
}: LoaderFooterListProps): JSX.Element => {
  return (
    <Container>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="#001e2b"
          testID="loader-footer-list"
        />
      )}
    </Container>
  );
};
