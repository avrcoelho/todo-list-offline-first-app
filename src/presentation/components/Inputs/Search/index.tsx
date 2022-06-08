import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  InputContainer,
  Input,
  ButtonClear,
  Loader,
  AmountLabel,
} from './styles';

interface InputSearchProps {
  isLoading: boolean;
  onChange(value: string): void;
  amount?: number;
}

let TIMER: NodeJS.Timeout;
const DELAY = 500;

export const InputSearch = ({
  isLoading,
  amount,
  onChange,
}: InputSearchProps): JSX.Element => {
  const [value, setValue] = useState('');

  const onClearSearch = (): void => {
    setValue('');
  };

  const onChangeInputText = (text: string): void => {
    clearTimeout(TIMER);
    setValue(text);
  };

  useEffect(() => {
    TIMER = setTimeout(() => {
      onChange(value);
    }, DELAY);

    return () => {
      clearTimeout(TIMER);
    };
  }, [onChange, value]);

  const amountIsNumber = typeof amount === 'number';

  return (
    <Container>
      <InputContainer>
        <MaterialIcons name="search" color="#ccc" size={26} />

        <Input
          value={value}
          onChangeText={onChangeInputText}
          placeholder="Search..."
          placeholderTextColor="#b8b8b8"
          underlineColorAndroid="transparent"
        />

        {!!value && (
          <>
            {isLoading && (
              <Loader size="small" color="#00ed64" testID="loader" />
            )}
            {!isLoading && (
              <ButtonClear
                activeOpacity={0.6}
                onPress={onClearSearch}
                testID="btn-clear"
              >
                <MaterialIcons name="close" color="#fff" size={20} />
              </ButtonClear>
            )}
          </>
        )}
      </InputContainer>
      {amountIsNumber && (
        <AmountLabel>
          {amount} task{amount !== 1 && 's'}
        </AmountLabel>
      )}
    </Container>
  );
};
