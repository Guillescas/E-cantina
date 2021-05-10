import React, {
  useRef,
  useEffect,
  ReactElement,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import ReactInputMask from 'react-input-mask';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons/lib';

import { FiAlertTriangle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  mask: string;
}

const InputMask = ({
  name,
  icon: Icon,
  mask,
  ...rest
}: InputProps): ReactElement => {
  const inputRef = useRef<ReactInputMask>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current);
  }, []);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <ReactInputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        mask={mask}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertTriangle color="#ee6c4d" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputMask;
