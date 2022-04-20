/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import { api, endpoints } from '../../../../utils';

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
import SelectInput from '../../../../components/SelectInput';
import Button from '../../../../components/Button';

import { createUser, updateUser } from '../../../../services/user.service';

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
  const cod_usuario = v4();
  const isUserSelected = Object.keys(userSelected || {});

  const [selectedUserAux, setSelectedUserAux] = useState<User | undefined>(
    undefined,
  );

  const [groups, setGroups] = useState([]);

  const roles = [
    { label: 'Usuário', id: 1, value: 'usuario' },
    { label: 'Usuário Aprovador', value: 'usuario aprovador', id: 2 },
    { label: 'Admin', value: 'admin', id: 3 },
    { label: 'Admin Aprovador', value: 'admin aprovador', id: 4 },
  ];

  function transFormGroups(data: any) {
    return data.map((group: any) => {
      return {
        label: group.descricao,
        id: group.cod_grupoUsuarios,
      };
    });
  }

  useEffect(() => {
    setSelectedUserAux(undefined);
    setSelectedUserAux(userSelected || undefined);
  }, [userSelected]);

  useEffect(() => {
    async function getUserGroups() {
      const { data } = await api.get(endpoints.USER_GROUP.GET_ALL);

      setGroups(transFormGroups(data));
    }

    getUserGroups();
  }, []);

  const swalSuccess = (message: string) => {
    return swal.fire({
      title: 'Tudo certo!',
      icon: 'success',
      text: message || '',
      confirmButtonColor: '#FF5427',
    });
  };

  const swalError = (message: string) => {
    return swal.fire({
      title: 'Ops, algo deu errado!',
      icon: 'error',
      text: message || 'Erro desconhecido',
      confirmButtonColor: '#FF5427',
    });
  };

  return (
    <Formik
      initialValues={{
        cod_grupousuarios: '',
        cod_usuario: '',
        custo_hora: 0,
        email: '',
        funcao: '',
        grupoUsuarios: '',
        matricula: '',
        nome: '',
        senha: '',
        setor: '',
        ...selectedUserAux,
      }}
      enableReinitialize
      onSubmit={values => {
        if (isUserSelected.length > 0) {
          return updateUser(values?.cod_usuario || '', {
            cod_grupousuarios: values?.cod_grupousuarios || '',
            nome: values?.nome || '',
            email: values?.email || '',
            funcao: values?.funcao || '',
            custo_hora: values?.custo_hora || 0,
            setor: values?.setor || '',
            // TODO userStatus - waiting API implementation
          })
            .then(() => swalSuccess('Usuário editado com sucesso'))
            .catch(() =>
              swalError('Algo deu errado! Usuário não pode ser editado'),
            );
        }
        return createUser({ ...values, cod_usuario })
          .then(() => swalSuccess('Usuário criado com sucesso!'))
          .catch(() =>
            swalError(
              'Algo deu errado. Revise as informações e tente novamente',
            ),
          );
      }}
      validationSchema={validations}
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
                name="email"
                width="255px"
                labelText="E-MAIL*"
                hasError={!!errors.email && touched.email && !!errors.email}
                errorMessage={errors.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Insira o email do usuário"
              />
              <Input
                width="255px"
                name="senha"
                labelText="Senha"
                disabled={!!isUserSelected.length}
                hasError={!!errors.senha && touched.senha && !!errors.senha}
                errorMessage={errors.senha}
                type="password"
                value={values.senha}
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
              <SelectInput
                width="255px"
                name="funcao"
                labelText="FUNÇÃO*"
                options={roles}
                consideredValue="value"
                hasError={!!errors.funcao && touched.funcao && !!errors.funcao}
                errorMessage={errors.funcao}
                value={values.funcao}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Selecione"
              />
              <SelectInput
                width="255px"
                name="cod_grupousuarios"
                labelText="GRUPO*"
                options={groups}
                consideredValue="id"
                hasError={
                  !!errors.cod_grupousuarios &&
                  touched.cod_grupousuarios &&
                  !!errors.cod_grupousuarios
                }
                errorMessage={errors.cod_grupousuarios}
                value={values.cod_grupousuarios}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Selecione"
              />
            </InputsWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                labelText="NOME*"
                hasError={!!errors.nome && touched.nome && !!errors.nome}
                errorMessage={errors.nome}
                name="nome"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Insira o nome do usuário"
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
                value={userSelected?.custo_hora || values.custo_hora}
                name="custo_hora"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="R$ ****"
              />
              <Input
                width="255px"
                name="matricula"
                labelText="MATRÍCULA*"
                disabled={!!isUserSelected.length}
                hasError={
                  !!errors.matricula && touched.matricula && !!errors.matricula
                }
                errorMessage={errors.matricula}
                value={values.matricula}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Informe o número"
              />
            </InputsWrapper>

            <InputsWrapper>
              <Input
                width="255px"
                labelText="SETOR"
                name="setor"
                value={values.setor}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Informe o setor do usuário"
              />
              {/* <SelectInput
                    options={[
                      { label: 'Ativado', id: 1 },
                      { label: 'Inativado', id: 2 },
                    ]}
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
                  /> */}
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
