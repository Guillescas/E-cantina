import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactElement,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface IOptionsProps {
  optionValue: string;
  optionLabel: string;
  disabled?: boolean;
  selected?: boolean;
  hidden?: boolean;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  options: IOptionsProps[];
  label?: string;
}

const Select = ({
  name,
  icon: Icon,
  options,
  label,
  hidden,
  ...rest
}: ISelectProps): ReactElement => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      >
        <option value="" disabled selected>
          Selecione uma opção
        </option>
        {options.map(option => (
          <option
            hidden={hidden}
            value={option.optionValue}
            disabled={option.disabled}
            selected={option.selected}
          >
            {option.optionLabel}
          </option>
        ))}
      </select>
      {label && <label>{label}</label>}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#ee6c4d" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
