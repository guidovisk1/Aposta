import React from 'react';

import { icons } from '../../../../utils/icons';

import HambIcon from '../../../../assets/icons/hamburguer-menu.svg';

import {
  ContainerOpened,
  ContainerClosed,
  HamburguerMenuDiv,
  HambIconWrapper,
  MenuList,
  MenuItem,
  MenuTitleOpenedWrapper,
  MenuTitleText,
  MenuItemOpened,
  CustomFiX,
} from './styles';

interface MenuOptions {
  title: string;
  icon: string;
  path: string;
  id: number;
}

interface SideMenuProps {
  isOpen?: boolean;
  menuOptions: MenuOptions[];
  handleOpening: (parameter: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  menuOptions,
  handleOpening,
}) => {
  const renderOpenedMenu = () => {
    return (
      <ContainerOpened>
        <MenuTitleOpenedWrapper>
          <MenuTitleText>Menu Principal</MenuTitleText>
          <CustomFiX
            onClick={() => handleOpening(false)}
            size={24}
            color="#fff"
          />
        </MenuTitleOpenedWrapper>

        <MenuList>
          {menuOptions.map(option => (
            <MenuItemOpened to={option.path} key={option.id}>
              <img src={icons[option.icon]} alt={option.title} />
              <span>{option.title}</span>
            </MenuItemOpened>
          ))}
          <MenuItemOpened to="/dashboard">
            <img src={icons.gotItLarge} />
          </MenuItemOpened>
        </MenuList>
      </ContainerOpened>
    );
  };

  const renderClosedMenu = () => {
    return (
      <ContainerClosed>
        <HamburguerMenuDiv>
          <HambIconWrapper
            onClick={() => handleOpening(true)}
            src={HambIcon}
            alt="hamburguer menu"
          />
        </HamburguerMenuDiv>

        <MenuList>
          {menuOptions.map(option => (
            <MenuItem to={option.path} key={option.id}>
              <img src={icons[option.icon]} alt={option.title} />
            </MenuItem>
          ))}
          <MenuItem to="/dashboard">
            <img src={icons.gotIt} />
          </MenuItem>
        </MenuList>
      </ContainerClosed>
    );
  };
  return isOpen ? renderOpenedMenu() : renderClosedMenu();
};

export default SideMenu;
