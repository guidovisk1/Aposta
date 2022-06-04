import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const [checkboxValue, setCheckboxValue] = useState(true);

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

  const handleRememberUser = (email: string, password: string) => {
    if (checkboxValue) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  };

  const {
    dirty,
    isValid,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validations,
    onSubmit: async () => {
      setIsLoading(true);
      handleRememberUser(values.email, values.password);
      await auth
        .signIn({ email: values.email, password: values.password })
        .catch(message => {
          showErrorModal(message.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    async function setFields() {
      if (email && password) {
        await setFieldValue('email', email);
        await setFieldTouched('email', true);

        await setFieldTouched('password', true);
        await setFieldValue('password', password);
      }
    }

    setFields();
  }, [setFieldValue, setFieldTouched]);

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
        <Checkbox
          labelText="Lembrar usuário"
          checked={checkboxValue}
          onChange={e => setCheckboxValue(e.target.checked)}
        />
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
      <ForgetPasswordText onClick={() => history.push('recuperar-senha')}>
        Esqueci minha senha
      </ForgetPasswordText>
    </Container>
  );
};

export default LoginBox;
