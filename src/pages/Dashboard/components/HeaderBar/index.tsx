import React from 'react';

import { useLocation } from 'react-router-dom';

import ExitIcon from '../../../../assets/icons/exit-icon.svg';

import { useAuth } from '../../../../hooks/Auth/auth';

import {
  Container,
  SystemTitle,
  RouteName,
  Divider,
  ExitAndUserNameWrapper,
  UserName,
  ExitButton,
  MainInfoWrapper,
} from './styles';
import { routesDictionary } from '../../../../utils/routesTranslate';

const HeaderBar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <Container>
      <MainInfoWrapper>
        <SystemTitle>Sistema de Manutenção e Inspeção</SystemTitle>
        <Divider />
        <RouteName>{routesDictionary.get(location.pathname)}</RouteName>
      </MainInfoWrapper>

      <ExitAndUserNameWrapper>
        <UserName>{user.nome}</UserName>
        <ExitButton onClick={() => signOut()} src={ExitIcon} alt="Exit Icon" />
      </ExitAndUserNameWrapper>
    </Container>
  );
};

export default HeaderBar;
