import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';

import { api } from '../../../../utils/api';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import { Container, MainTitle, SecondaryText, ButtonsWrapper } from './styles';

import validations from './validations';

interface RouteParams {
  id: string;
}

const LoginBox: React.FC = () => {
  const history = useHistory();
  const routeParams: Partial<RouteParams> = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const showErrorModal = (message: string) => {
    return Swal.fire({
      title: 'Algo deu errado!',
      text:
        message ||
        'Algo deu errado durante o processo de login. Revise as informações e tente novamente.',
      icon: 'error',
      confirmButtonColor: '#FF5427',
    });
  };

  const showSuccessModal = (message?: string) => {
    return Swal.fire({
      title: 'Tudo certo!',
      text: message || 'Sua senha foi redefinida com sucesso.',
      icon: 'success',
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
      password: '',
      name: '',
      email: '',
    },
    validationSchema: validations,
    onSubmit: async () => {
      setIsLoading(true);
      api
        .post(`/usuarios/resetpwd/${routeParams.id}`, {
          email: values.email,
          senha: values.password,
          nome: values.name,
        })
        .then(() => {
          showSuccessModal();
        })
        .catch(err => {
          showErrorModal(err.response.data);
        })
        .finally(() => setIsLoading(false));
    },
  });

  const handlePasswordChangeText = (value: string) => {
    setFieldValue('password', value);
  };
  const handleNameChangeText = (value: string) => {
    setFieldValue('name', value);
  };
  const handleEmailChangeText = (value: string) => {
    setFieldValue('email', value);
  };

  return (
    <Container>
      <MainTitle>Recuperar senha</MainTitle>
      <SecondaryText>Digite sua nova senha</SecondaryText>

      <Input
        hasError={
          touched.email && errors.email ? Boolean(errors.email) : undefined
        }
        value={values.email}
        errorMessage={errors.email ? errors.email : ''}
        labelText="E-MAIL"
        onBlur={handleBlur}
        placeholder="Digite seu e-mail"
        onChange={e => handleEmailChangeText(e.target.value)}
        name="email"
      />

      <Input
        hasError={
          touched.name && errors.name ? Boolean(errors.name) : undefined
        }
        value={values.name}
        errorMessage={errors.name ? errors.name : ''}
        labelText="NOME"
        onBlur={handleBlur}
        placeholder="Digite seu nome"
        onChange={e => handleNameChangeText(e.target.value)}
        name="name"
      />

      <Input
        hasError={
          touched.password && errors.password
            ? Boolean(errors.password)
            : undefined
        }
        value={values.password}
        errorMessage={errors.password ? errors.password : ''}
        labelText="SENHA"
        onBlur={handleBlur}
        placeholder="Digite sua nova senha"
        onChange={e => handlePasswordChangeText(e.target.value)}
        name="password"
      />

      <ButtonsWrapper>
        <Button
          full
          disabled={!dirty || !isValid}
          loading={isLoading}
          onClick={() => handleSubmit()}
          type="button"
        >
          Redefinir
        </Button>
        <Button full tertiary onClick={() => history.push('/')} type="button">
          Voltar
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default LoginBox;
