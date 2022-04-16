import React from 'react';

import { Container, HeaderWrapper, HeaderTitle, AddButton } from './styles';
import Input from '../Input';

import addIcon from '../../assets/icons/add-icon.svg';

interface SideInfoPanelProps {
  title: string;
  openForm?: () => void;
}

const SideInfoPanel: React.FC<SideInfoPanelProps> = ({
  title,
  openForm,
  children,
}) => {
  return (
    <Container>
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
        <Input width="180px" height="45px" placeholder="Pesquisar..." />
      </HeaderWrapper>
      <AddButton onClick={openForm}>
        <img src={addIcon} alt="Adicionar" />
      </AddButton>

      {children}
    </Container>
  );
};

export default SideInfoPanel;
