import React, { useState } from 'react';

import menuOptions from '../../utils/menu';

import { Container } from './styles';

import SideMenu from './components/SideMenu';

const Dashboard: React.FC = () => {
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
    </Container>
  );
};

export default Dashboard;
