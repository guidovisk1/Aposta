import React from 'react';

import { Container, Label, HTMLInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholder?: string;
  name?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  hasError,
  errorMessage,
  labelText,
  placeholder,
  name = '',
  ...rest
}) => {
  return (
    <Container hasError={hasError}>
      <Label hasError={hasError}>{labelText}</Label>
      <HTMLInput
        {...rest}
        name={name}
        hasError={hasError}
        placeholder={hasError ? errorMessage : placeholder}
      />
    </Container>
  );
};

export default Input;
