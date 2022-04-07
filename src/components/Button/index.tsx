import React from 'react';

import { Container } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  secondary = false,
  ...rest
}) => {
  return (
    <Container {...rest} disabled={disabled} secondary={secondary}>
      {children}
    </Container>
  );
};

export default Button;
