import React from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';

const Users: React.FC = () => {
  return (
    <Container className="page-container">
      <SideInfoPanel title="Usuários" />
    </Container>
  );
};

export default Users;
