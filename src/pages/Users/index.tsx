import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';
import ListItems from './components/ListItem';
import Form from './components/Form';

import { getUsers } from '../../services/user.service';

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    getAllUsers();
  }, []);

  function clickMe() {
    console.log('Fui clicado e apareci no USERS page');
  }

  function openForm() {
    console.log('Abri o modal');
  }

  return (
    <Container className="page-container">
      <SideInfoPanel openForm={() => openForm()} title="Usuários">
        {users.length > 0 && (
          <ListItems list={users} onClicked={() => clickMe()} />
        )}
      </SideInfoPanel>

      <Form title="Adicionar um Usuário" />
    </Container>
  );
};

export default Users;
