import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../../hooks/Auth/auth';

import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';

import {
  Container,
  MainTitle,
  SecondaryText,
  LineSeparator,
  ButtonsWrapper,
  ForgetPasswordText,
} from './styles';

const LoginBox: React.FC = () => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await auth
      .signIn({ email, password })
      .catch(() => {
        Swal.fire({
          title: 'Algo deu errado!',
          text: 'Algo deu errado durante o processo de login. Revise as informações e tente novamente.',
          icon: 'error',
          confirmButtonColor: '#FF5427',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <Container>
      <MainTitle>Sistema de Manutenção e Inspenção</MainTitle>
      <SecondaryText>Acesse sua conta</SecondaryText>

      <Input
        labelText="Login"
        placeholder="Login de usuário"
        onChange={handleOnChange}
        name="email"
      />
      <Input
        labelText="Senha"
        placeholder="*****"
        type="password"
        onChange={handleOnChange}
        name="password"
      />
      <ButtonsWrapper>
        <Checkbox labelText="Lembrar usuário" />
        <Button loading={isLoading} onClick={() => handleSignIn()}>
          Login
        </Button>
      </ButtonsWrapper>

      <LineSeparator />
      <ForgetPasswordText>Esqueci minha senha</ForgetPasswordText>
    </Container>
  );
};

export default LoginBox;
