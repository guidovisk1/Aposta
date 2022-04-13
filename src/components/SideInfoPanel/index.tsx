import React from 'react';

import { Container, HeaderWrapper, HeaderTitle, AddButton } from './styles';
import Input from '../Input';

import addIcon from '../../assets/icons/add-icon.svg';

interface SideInfoPanelProps {
  title: string;
}

const SideInfoPanel: React.FC<SideInfoPanelProps> = ({ title }) => {
  return (
    <Container>
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
        <Input width="180px" height="45px" placeholder="Pesquisar..." />
      </HeaderWrapper>
      <AddButton>
        <img src={addIcon} alt="Adicionar" />
      </AddButton>
    </Container>
  );
};

export default SideInfoPanel;
