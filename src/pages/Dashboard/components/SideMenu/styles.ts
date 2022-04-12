import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

interface MenuItem {
  isActive?: boolean;
}

export const ContainerOpened = styled.aside`
  width: 372px;
  height: 100vh;
  z-index: 99;

  @keyframes openning {
    0% {
      width: 80px;
    }
    100% {
      width: 372px;
    }
  }

  animation: openning 0.3s;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  background: linear-gradient(
      87.16deg,
      rgba(85, 85, 85, 0.25) 1.65%,
      rgba(85, 85, 85, 0.0001) 98.35%
    ),
    #333333;
`;

export const CustomFiX = styled(FiX)`
  cursor: pointer;

  :hover {
    transform: rotate(-180deg) scale(1.2);
    transition: 0.3s;
  }
`;

export const MenuTitleOpenedWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  padding: 0 27px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuTitleText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.55px;
  color: #fff;
`;

export const MenuItemOpened = styled(Link)<MenuItem>`
  width: 100%;
  height: 71.5px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  text-align: left;
  text-decoration: none;
  transition: 1.2;

  @keyframes menuItemAnimation {
    0% {
      opacity: 0;
      transform: translateX(-300px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  animation: menuItemAnimation 0.6s;

  span {
    margin-left: 20px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.55px;
  }

  ${props =>
    props.isActive &&
    css`
      border-right: 4.5px solid #ff5427;
      background: rgba(0, 0, 0, 0.2);
    `}

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transition: 0.4s;
    border-right: 4.5px solid #ff5427;
  }

  & img:hover {
    transform: scale(1.3);
    transition: 0.3s;
  }

  & img:active {
    transform: scale(0.9);
    transition: 0.3s;
  }

  &:last-child {
    justify-content: center;
    bottom: 0;
    position: absolute;
  }
`;

export const ContainerClosed = styled.aside`
  overflow-x: hidden;
  width: 80px;
  height: 100vh;

  @keyframes closing {
    0% {
      width: 372px;
    }
    100% {
      width: 80px;
    }
  }

  animation: closing 0.3s;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  background: linear-gradient(
      87.16deg,
      rgba(85, 85, 85, 0.25) 1.65%,
      rgba(85, 85, 85, 0.0001) 98.35%
    ),
    #333333;
`;

export const HamburguerMenuDiv = styled.div`
  width: 100%;
  height: 81.5px;
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const HambIconWrapper = styled.img`
  &:hover {
    transform: scale(1.3);
    transition: 0.3s;
  }

  &:active {
    transform: scale(0.9);
    transition: 0.3s;
  }
`;

export const MenuList = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  position: relative;
  text-decoration: none;

  margin-top: 8.5px;
`;

export const MenuItem = styled(Link)<MenuItem>`
  width: 100%;
  height: 71.5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes menuItemAnimationClosing {
    0% {
      opacity: 0;
      transform: translateX(300px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  animation: menuItemAnimationClosing 0.4s;

  ${props =>
    props.isActive &&
    css`
      border-right: 4.5px solid #ff5427;
      background: rgba(0, 0, 0, 0.2);
    `}

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    border-right: 4.5px solid #ff5427;
  }

  & img:hover {
    transform: scale(1.3);
    transition: 0.3s;
  }

  & img:active {
    transform: scale(0.9);
    transition: 0.3s;
  }

  :last-child {
    bottom: 0;
    position: absolute;
  }
`;
