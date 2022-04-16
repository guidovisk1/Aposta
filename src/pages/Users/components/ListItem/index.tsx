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
  name: string;
  userType: string;
  sector: string;
  id: string;
}
interface ListItemProps {
  list: Item[];
  onClicked?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onClicked }) => {
  return (
    <Container>
      {list.length &&
        list.map(user => (
          <Item key={user.id} onClick={onClicked}>
            <LogoWrapper>
              <RoundedOutline>
                <img src={userIcon} />
              </RoundedOutline>
            </LogoWrapper>

            <UserInfoWrapper>
              <NameWrapper>
                <Name>{user.name}</Name>
              </NameWrapper>

              <DownInfoWrapper>
                <UserTypeWrapper>
                  <UserType>Tipo:</UserType>
                  <UserTypeText userType={user.userType}>
                    {user.userType === 'admin' ? 'ADMIN' : 'USER'}
                  </UserTypeText>
                </UserTypeWrapper>

                <Sector>SETOR: {user.sector}</Sector>
              </DownInfoWrapper>
            </UserInfoWrapper>
          </Item>
        ))}
    </Container>
  );
};

export default ListItem;
