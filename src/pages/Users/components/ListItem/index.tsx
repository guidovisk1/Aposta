import React from 'react';

import userIcon from '../../../../assets/icons/user-orange-icon.svg';

import {
  Container,
  Item,
  RoundedOutline,
  LogoWrapper,
  NameWrapper,
  Name,
  UserTypeWrapper,
  UserType,
  UserTypeText,
  UserInfoWrapper,
  DownInfoWrapper,
  Sector,
} from './styles';

interface Item {
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
interface ListItemProps {
  list: Item[];
  onClicked: (user: Item) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(user => (
          <Item key={user.cod_usuario} onClick={() => onClicked(user)}>
            <LogoWrapper>
              <RoundedOutline>
                <img src={userIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <UserInfoWrapper>
              <NameWrapper>
                <Name>{user.nome}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <UserTypeWrapper>
                  <UserType>Tipo:</UserType>
                  <UserTypeText userType={user.funcao}>
                    {user.funcao === 'admin' ? 'ADMIN' : 'USER'}
                  </UserTypeText>
                </UserTypeWrapper>

                <Sector>SETOR: {user.setor.toUpperCase()}</Sector>
              </DownInfoWrapper>
            </UserInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
