import React from 'react';

import { Container, HTMLCheckbox, LabelText } from './styles';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ labelText, ...rest }) => {
  return (
    <Container className="container">
      <HTMLCheckbox className="checkmark" {...rest} type="checkbox" />
      <LabelText>{labelText}</LabelText>
    </Container>
  );
};

export default Checkbox;
