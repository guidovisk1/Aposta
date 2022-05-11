import React from 'react';

import { Container } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  loading?: boolean;
  full?: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  secondary = false,
  tertiary,
  loading = false,
  full = false,
  backgroundColor,
  color,
  width,
  height,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      disabled={loading ? true : disabled}
      secondary={secondary}
      tertiary={tertiary}
      loading={loading || undefined}
      full={full}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
    >
      {loading ? '' : children}
    </Container>
  );
};

export default Button;
