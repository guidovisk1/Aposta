import React from 'react';

import { Container } from './styles';

interface ButtonProps {
  disabled?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  secondary = false,
}) => {
  return (
    <Container disabled={disabled} secondary={secondary}>
      {children}
    </Container>
  );
};

export default Button;
