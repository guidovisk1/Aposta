import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { api } from '../../../../utils/api';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import { Container, MainTitle, SecondaryText, ButtonsWrapper } from './styles';

import validations from './validations';

const LoginBox: React.FC = () => {
  const history = useHistory();

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
    },
    validationSchema: validations,
    onSubmit: async () => {
      setIsLoading(true);
      api
        .post('/usuarios/forgetpwd', { email: values.email })

        .catch(err => {
          showErrorModal(err.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const handleEmailChangeText = (value: string) => {
    setFieldValue('email', value);
  };

  return (
    <Container>
      <MainTitle>Recuperar senha</MainTitle>
      <SecondaryText>
        Digite o e-mail cadastrado e siga as instruções contidas no e-mail.
      </SecondaryText>

      <Input
        hasError={
          touched.email && errors.email ? Boolean(errors.email) : undefined
        }
        value={values.email}
        errorMessage={errors.email ? errors.email : ''}
        labelText="E-MAIL"
        onBlur={handleBlur}
        placeholder="Login de usuário"
        onChange={e => handleEmailChangeText(e.target.value)}
        name="email"
      />

      <ButtonsWrapper>
        <Button
          full
          disabled={!dirty || !isValid}
          loading={isLoading}
          onClick={() => handleSubmit()}
          type="button"
        >
          Recuperar
        </Button>
        <Button full tertiary onClick={() => history.push('/')} type="button">
          Voltar
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default LoginBox;
