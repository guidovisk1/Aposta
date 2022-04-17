import React from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';

const UsersGroup: React.FC = () => {
  return (
    <Container className="page-container">
      <SideInfoPanel onSearch={() => console.log('Oi')} title="Grupos" />
    </Container>
  );
};

export default UsersGroup;
