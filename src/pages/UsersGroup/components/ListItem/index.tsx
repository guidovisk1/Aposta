import React from 'react';

import userIcon from '../../../../assets/icons/user-orange-icon.svg';

import {
  Container,
  Item,
  RoundedOutline,
  LogoWrapper,
  NameWrapper,
  Name,
  UserInfoWrapper,
  DownInfoWrapper,
  Sector,
} from './styles';

interface Item {
  cod_grupoUsuarios: string;
  descricao: string;
  status?: number;
}
interface ListItemProps {
  list: Item[];
  onClicked: (userGroup: Item) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(userGroup => (
          <Item
            key={userGroup.cod_grupoUsuarios}
            onClick={() => onClicked(userGroup)}
          >
            <LogoWrapper>
              <RoundedOutline>
                <img src={userIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <UserInfoWrapper>
              <NameWrapper>
                <Name>{userGroup.descricao}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <Sector>COD: {userGroup.cod_grupoUsuarios}</Sector>
              </DownInfoWrapper>
            </UserInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
