import React from 'react';

import { Container, Label, HTMLInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholder?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  labelText,
  placeholder,
  name = '',
  ...rest
}) => {
  return (
    <Container>
      <Label>{labelText}</Label>
      <HTMLInput {...rest} name={name} placeholder={placeholder} />
    </Container>
  );
};

export default Input;
