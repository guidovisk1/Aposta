import React from 'react';

import { Container, HeaderWrapper, HeaderTitle, AddButton } from './styles';
import Input from '../Input';

import addIcon from '../../assets/icons/add-icon.svg';

interface SideInfoPanelProps {
  title: string;
  onSearch: (typedSearch: string) => void;
  openForm?: () => void;
}

const SideInfoPanel: React.FC<SideInfoPanelProps> = ({
  title,
  openForm,
  onSearch,
  children,
}) => {
  return (
    <Container>
      <HeaderWrapper>
        <HeaderTitle>{title}</HeaderTitle>
        <Input
          onChange={e => onSearch(e.target.value)}
          width="180px"
          height="45px"
          placeholder="Pesquisar..."
        />
      </HeaderWrapper>
      <AddButton onClick={openForm}>
        <img src={addIcon} alt="Adicionar" />
      </AddButton>

      {children}
    </Container>
  );
};

export default SideInfoPanel;
