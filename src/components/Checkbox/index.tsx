import React from 'react';

import { Container, HTMLCheckbox, LabelText } from './styles';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ labelText, ...rest }) => {
  return (
    <Container data-testid="checkbox-wrapper" className="container">
      <HTMLCheckbox
        id="checkbox"
        data-testid="checkbox-input"
        className="checkmark"
        {...rest}
        type="checkbox"
      />
      <LabelText data-testid="checkbox-label">{labelText}</LabelText>
    </Container>
  );
};

export default Checkbox;
