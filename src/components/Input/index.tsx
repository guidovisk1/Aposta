import React from 'react';

import { Container, Label, HTMLInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholder?: string;
  name?: string;
  hasError?: boolean;
  errorMessage?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  hasError = false,
  errorMessage,
  labelText,
  placeholder,
  name = '',
  width = '100%',
  height = '55px',
  disabled,
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
        disabled={disabled}
        hasError={hasError}
        placeholder={hasError ? errorMessage : placeholder}
      />
    </Container>
  );
};

export default Input;
