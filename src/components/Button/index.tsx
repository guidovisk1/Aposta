import React from 'react';

import { Container } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  secondary?: boolean;
  loading?: boolean;
  full?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  secondary = false,
  loading = false,
  full = false,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      disabled={loading ? true : disabled}
      secondary={secondary}
      loading={loading || undefined}
      full={full}
    >
      {loading ? '' : children}
    </Container>
  );
};

export default Button;
