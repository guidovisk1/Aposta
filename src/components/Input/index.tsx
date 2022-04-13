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
}

const Input: React.FC<InputProps> = ({
  hasError,
  errorMessage,
  labelText,
  placeholder,
  name = '',
  width = '100%',
  height = '55px',
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
      />
    </Container>
  );
};

export default Input;
