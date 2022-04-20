import React from 'react';

import { Container, Label, HTMLInput } from './styles';

interface selectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  placeholder?: string;
  name?: string;
  hasError?: boolean;
  errorMessage?: string;
  width?: string;
  height?: string;
  options: any[];
  consideredValue?: string;
}

const SelectInput: React.FC<selectInputProps> = ({
  hasError = false,
  errorMessage,
  labelText,
  placeholder,
  name = '',
  width = '100%',
  height = '55px',
  options,
  consideredValue,
  ...rest
}) => {
  return (
    <Container
      width={width}
      height={height}
      hasError={hasError}
      labelText={labelText}
    >
      {labelText && <Label hasError={hasError}>{labelText}</Label>}
      <HTMLInput
        {...rest}
        name={name}
        hasError={hasError}
        placeholder={hasError ? errorMessage : placeholder}
      >
        {options.map(item => (
          <option value={item[consideredValue || item.label]} key={item.id}>
            {(item as any).label}
          </option>
        ))}
      </HTMLInput>
    </Container>
  );
};

export default SelectInput;
