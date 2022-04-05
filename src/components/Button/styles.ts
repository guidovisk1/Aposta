import styled, { css } from 'styled-components';

interface ButtonProps {
  secondary?: boolean;
  disabled?: boolean;
}

export const Container = styled.button<ButtonProps>`
  width: 200px;
  height: 51px;

  background-color: #ff5427;
  color: #fff;
  font-size: 13px;
  border: none;
  letter-spacing: 1.3px;
  font-weight: bold;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
    transition: 0.2s;
  }

  :active {
    transform: scale(0.95);
    transition: 0.2s;
  }

  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.15);

  ${props =>
    props.secondary &&
    css`
      border-color: #ff5427;
      color: #ff5427;
      font-size: 13px;
      background-color: transparent;
    `}

  ${props =>
    props.disabled &&
    css`
      color: #fff;
      font-size: 13px;
      background-color: #c6c6c6;
      cursor: not-allowed;
    `}
`;
