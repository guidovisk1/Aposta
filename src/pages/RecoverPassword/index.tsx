import React from 'react';

import { Container, PatternLogin, LogoWrapper } from './styles';
import logo from '../../assets/logo.svg';
import patternLogin from '../../assets/pattern-login.svg';

import LoginBox from './components/LoginBox';

const Recover: React.FC = () => {
  return (
    <Container>
      <LoginBox />
      <LogoWrapper>
        <img src={logo} alt="GoIt" />
      </LogoWrapper>

      <PatternLogin src={patternLogin} alt="pattern" />
    </Container>
  );
};

export default Recover;
