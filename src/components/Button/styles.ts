import styled, { css } from 'styled-components';

interface ButtonProps {
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  height?: string;
  width?: string;
  color?: string;
  backgroundColor?: string;
  tertiary?: boolean;
}

export const Container = styled.button<ButtonProps>`
  width: 200px;
  height: 51px;

  ${props =>
    props.full &&
    css`
      width: 100%;
    `}

  ${props =>
    props.width &&
    css`
      height: ${props.width};
    `}

  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}

  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}




  background-color: #39ff14;
  color: #fff;
  font-size: 13px;
  border: none;
  letter-spacing: 1.3px;
  font-weight: bold;
  cursor: pointer;
  position: relative;

  :hover {
    transform: scale(1.05);
    transition: 0.2s;
  }

  :active {
    transform: scale(0.95);
    transition: 0.2s;
  }

  @keyframes button-loading-spinner {
    from {
      transform: rotate(0turn);
    }

    to {
      transform: rotate(1turn);
    }
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

  ${props =>
    props.tertiary &&
    css`
      color: #ff5427;
      font-size: 13px;
      background-color: transparent;
      border: 1px solid #ff5427;
    `}

  ${props =>
    props.loading &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: 26px;
        height: 26px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-top-color: #ffffff;

        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
      }
    `}
`;
