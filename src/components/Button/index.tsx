import React from 'react';

import { Container } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  secondary?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  secondary = false,
  loading = false,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      disabled={loading ? true : disabled}
      secondary={secondary}
      loading={loading || undefined}
    >
      {loading ? '' : children}
    </Container>
  );
};

export default Button;
