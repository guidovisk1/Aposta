import React from 'react';

import {
  Container,
  MainTitle,
  SecondaryText,
  LineSeparator,
  ButtonsWrapper,
  ForgetPasswordText,
} from './styles';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';

const LoginBox: React.FC = () => {
  return (
    <Container>
      <MainTitle>Sistema de Manutenção e Inspenção</MainTitle>
      <SecondaryText>Acesse sua conta</SecondaryText>

      <Input labelText="Login" placeholder="Login de usuário" />
      <Input labelText="Senha" placeholder="*****" type="password" />
      <ButtonsWrapper>
        <Checkbox labelText="Lembrar usuário" />
        <Button>Login</Button>
      </ButtonsWrapper>

      <LineSeparator />
      <ForgetPasswordText>Esqueci minha senha</ForgetPasswordText>
    </Container>
  );
};

export default LoginBox;
