import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
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

import validations from './validations';

const LoginBox: React.FC = () => {
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const showErrorModal = () => {
    return Swal.fire({
      title: 'Algo deu errado!',
      text: 'Algo deu errado durante o processo de login. Revise as informações e tente novamente.',
      icon: 'error',
      confirmButtonColor: '#FF5427',
    });
  };

  const {
    dirty,
    isValid,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validations,
    onSubmit: async () => {
      setIsLoading(true);
      await auth
        .signIn({ email: values.email, password: values.password })
        .catch(() => {
          showErrorModal();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const handleEmailChangeText = (value: string) => {
    setFieldValue('email', value);
  };

  const handlePasswordChangeText = (value: string) => {
    setFieldValue('password', value);
  };

  return (
    <Container>
      <MainTitle>Sistema de Manutenção e Inspenção</MainTitle>
      <SecondaryText>Acesse sua conta</SecondaryText>

      <Input
        hasError={
          touched.email && errors.email ? Boolean(errors.email) : undefined
        }
        value={values.email}
        errorMessage={errors.email ? errors.email : ''}
        labelText="Login"
        onBlur={handleBlur}
        placeholder="Login de usuário"
        onChange={e => handleEmailChangeText(e.target.value)}
        name="email"
      />
      <Input
        hasError={
          touched.password && errors.password
            ? Boolean(errors.password)
            : undefined
        }
        value={values.password}
        errorMessage={errors.password ? errors.password : ''}
        onChange={e => handlePasswordChangeText(e.target.value)}
        onBlur={handleBlur}
        labelText="Senha"
        placeholder="*****"
        type="password"
        name="password"
      />
      <ButtonsWrapper>
        <Checkbox labelText="Lembrar usuário" />
        <Button
          disabled={!dirty || !isValid}
          loading={isLoading}
          onClick={() => handleSubmit()}
          type="button"
        >
          Login
        </Button>
      </ButtonsWrapper>

      <LineSeparator />
      <ForgetPasswordText>Esqueci minha senha</ForgetPasswordText>
    </Container>
  );
};

export default LoginBox;
