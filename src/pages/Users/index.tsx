import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';
import ListItems from './components/ListItem';
import Form from './components/Form';

import { getUsers } from '../../services/user.service';

interface User {
  cod_grupousuarios: string;
  cod_usuario: string;
  custo_hora: number;
  email: string;
  funcao: string;
  grupoUsuarios: string;
  matricula: string;
  nome: string;
  senha: string;
  setor: string;
  status: number;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([] as User[]);

  const [searchedUsers, setSearchedUsers] = useState<User[]>([] as User[]);
  const [selecteduser, setSelecteduser] = useState<User>({} as User);

  const getAllUsers = async () => {
    const { data } = await getUsers();
    const dataMapped = data.map((user: User) => {
      return { ...user, status: user.status ? 1 : 0 };
    });
    setUsers(dataMapped);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  function handleUserSelection(selected: User) {
    setSelecteduser(selected);
  }

  function openForm() {
    setSelecteduser({} as User);
  }
  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedUsers([]);
    setSearchedUsers(
      users.filter(user =>
        user.nome.toLowerCase().includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }

  return (
    <Container className="page-container">
      <SideInfoPanel
        onSearch={searchedValue => onSearch(searchedValue)}
        openForm={() => openForm()}
        title="Usuários"
      >
        {users.length > 0 && (
          <ListItems
            list={searchedUsers.length ? searchedUsers : users}
            onClicked={selectedUser => handleUserSelection(selectedUser)}
          />
        )}
      </SideInfoPanel>

      <Form
        userSelected={selecteduser}
        title="Adicionar um Usuário"
        onSave={() => getAllUsers()}
      />
    </Container>
  );
};

export default Users;
