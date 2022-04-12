import React, { useState } from 'react';

import menuOptions from '../../utils/menu';

import { Container } from './styles';

import SideMenu from './components/SideMenu';
import HeaderBar from './components/HeaderBar';

const Dashboard: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpening = (parameter: boolean) => {
    setIsOpen(parameter);
  };
  return (
    <Container>
      <SideMenu
        handleOpening={handleOpening}
        isOpen={isOpen}
        menuOptions={menuOptions}
      />
      <HeaderBar />
      {children}
    </Container>
  );
};

export default Dashboard;
