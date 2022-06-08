/* eslint-disable react/require-default-props */
import { InputSearch } from '../../../Inputs/Search';

type ListTaskHeaderProps = {
  isLoading: boolean;
  onSearch(value: string): void;
  amount?: number;
};

export const ListTaskHeader = ({
  isLoading,
  onSearch,
  amount = 0,
}: ListTaskHeaderProps): JSX.Element => {
  return (
    <InputSearch isLoading={isLoading} onChange={onSearch} amount={amount} />
  );
};
