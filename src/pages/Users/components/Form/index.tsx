/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { Formik } from 'formik';
import {
  Container,
  Title,
  Section,
  TitleSectionWrapper,
  TitleSectionText,
  InputsWrapper,
  ButtonWrapper,
} from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import { createUser } from '../../../../services/user.service';

import validations from './validations';

interface User {
  cod_grupousuarios: string;
  cod_usuario: string;
  custo_hora: number;
  email: string;
  funcao: string;
  grupoUsuarios: string;
  matricula: string;
  nome: string;
  senha: string;
  setor: string;
}

interface FormProps {
  title: string;
  userSelected?: User;
}

const Form: React.FC<FormProps> = ({ title, userSelected }) => {
  const codUsuario = String(Math.random());
  const isUserSelected = Object.keys(userSelected || {});

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        userRole: '',
        userGroup: '',
        userName: '',
        userEmail: '',
        userRegistrationCode: '',
        userSector: '',
        userStatus: '',
        userHourRate: 0,
      }}
      onSubmit={values => {
        if (isUserSelected.length > 0) {
          return createUser({
            codUsuario: userSelected?.cod_usuario || '',
            userGroup: userSelected?.cod_grupousuarios || '',
            userName: userSelected?.nome || '',
            userEmail: userSelected?.email || '',
            password: userSelected?.senha || '',
            userRole: userSelected?.funcao || '',
            userHourRate: userSelected?.custo_hora || 0,
            userSector: userSelected?.setor || '',
            userRegistrationCode: userSelected?.matricula || '',
          });
        }
        return createUser({ ...values, codUsuario });
      }}
      validationSchema={isUserSelected.length > 0 ? undefined : validations}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Container>
          <Title>{isUserSelected.length > 0 ? 'Editar Usuário' : title}</Title>
          <Section className="first">
            <TitleSectionWrapper>
              <TitleSectionText>ACESSO</TitleSectionText>
            </TitleSectionWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                name="login"
                labelText="Login"
                hasError={!!errors.login && touched.login && !!errors.login}
                errorMessage={errors.login}
                value={values.login}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Login"
              />
              <Input
                width="255px"
                name="password"
                labelText="Senha"
                hasError={
                  !!errors.password && touched.password && !!errors.password
                }
                errorMessage={errors.password}
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Senha"
              />
            </InputsWrapper>
          </Section>

          <Section>
            <TitleSectionWrapper>
              <TitleSectionText>INFORMAÇÕES DO USUÁRIO</TitleSectionText>
            </TitleSectionWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                name="userRole"
                labelText="FUNÇÃO*"
                hasError={
                  !!errors.userRole && touched.userRole && !!errors.userRole
                }
                errorMessage={errors.userRole}
                value={userSelected?.funcao || values.userRole}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Selecione"
              />
              <Input
                width="255px"
                name="userGroup"
                labelText="GRUPO*"
                hasError={
                  !!errors.userGroup && touched.userGroup && !!errors.userGroup
                }
                errorMessage={errors.userGroup}
                value={userSelected?.grupoUsuarios || values.userGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Selecione"
              />
            </InputsWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                labelText="NOME*"
                hasError={
                  !!errors.userName && touched.userName && !!errors.userName
                }
                errorMessage={errors.userName}
                name="userName"
                value={userSelected?.nome || values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Insira o nome do usuário"
              />
              <Input
                name="userEmail"
                width="255px"
                labelText="E-MAIL*"
                hasError={
                  !!errors.userEmail && touched.userEmail && !!errors.userEmail
                }
                errorMessage={errors.userEmail}
                value={userSelected?.email || values.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Insira o email do usuário"
              />
            </InputsWrapper>
          </Section>

          <Section className="last">
            <TitleSectionWrapper>
              <TitleSectionText>MAIS INFORMAÇÕES</TitleSectionText>
            </TitleSectionWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                labelText="CUSTO/HORA"
                value={userSelected?.custo_hora || values.userHourRate}
                name="userHourRate"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="R$ ****"
              />
              <Input
                width="255px"
                name="userRegistrationCode"
                labelText="MATRÍCULA*"
                hasError={
                  !!errors.userRegistrationCode &&
                  touched.userRegistrationCode &&
                  !!errors.userRegistrationCode
                }
                errorMessage={errors.userRegistrationCode}
                value={userSelected?.matricula || values.userRegistrationCode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Informe o número"
              />
            </InputsWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                labelText="SETOR"
                name="userSector"
                value={userSelected?.setor || values.userSector}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Informe o setor do usuário"
              />
              <Input
                width="255px"
                name="userStatus"
                labelText="STATUS*"
                hasError={
                  !!errors.userStatus &&
                  touched.userStatus &&
                  !!errors.userStatus
                }
                errorMessage={errors.userStatus}
                value={values.userStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Selecione"
              />
            </InputsWrapper>
          </Section>

          <ButtonWrapper>
            <Button type="submit" full disabled={isSubmitting}>
              {isUserSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
