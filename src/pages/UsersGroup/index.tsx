import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';

import { getUserGroups } from '../../services/userGroup.service';

import ListItem from './components/ListItem';
import Form from './components/Form';

interface IUserGroup {
  cod_grupoUsuarios: string;
  descricao: string;
  status?: number;
}

const UserGroup: React.FC = () => {
  const [userGroups, setuserGroup] = useState<IUserGroup[]>([] as IUserGroup[]);

  const [searchedUserGroup, setSearchedTraining] = useState<IUserGroup[]>(
    [] as IUserGroup[],
  );

  const [selectedTraining, setSelectedUserGroup] = useState<IUserGroup>(
    {} as IUserGroup,
  );
  async function fetchuserGroup() {
    const { data } = await getUserGroups();
    const userGroupMapped = data.map((userGroup: IUserGroup) => {
      return { ...userGroup, status: userGroup.status ? 1 : 0 };
    });
    setuserGroup(userGroupMapped);
  }

  useEffect(() => {
    fetchuserGroup();
  }, []);

  function handleUserGroupelection(selected: IUserGroup) {
    setSelectedUserGroup(selected);
  }

  function openForm() {
    setSelectedUserGroup({} as IUserGroup);
  }
  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedTraining([] as IUserGroup[]);
    setSearchedTraining(
      userGroups.filter(userGroup =>
        userGroup.descricao
          .toLowerCase()
          .includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }
  return (
    <Container className="page-container">
      <SideInfoPanel
        title="Grupo.."
        onSearch={searched => onSearch(searched)}
        openForm={() => openForm()}
      >
        <ListItem
          list={searchedUserGroup.length ? searchedUserGroup : userGroups}
          onClicked={userGroup => handleUserGroupelection(userGroup)}
        />
      </SideInfoPanel>

      <Form
        title="Adicionar um Grupo de Usuário"
        userGroupSelected={selectedTraining}
        onSave={() => fetchuserGroup()}
      />
    </Container>
  );
};

export default UserGroup;
