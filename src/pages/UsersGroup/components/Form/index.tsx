/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import SelectInput from '../../../../components/SelectInput';

import { Container, Title, ButtonWrapper } from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import {
  createUserGroups,
  updateUserGroups,
} from '../../../../services/userGroup.service';

import validations from './validations';

interface Training {
  cod_grupoUsuarios: string;
  descricao: string;
  status?: number;
}

interface FormProps {
  title: string;
  userGroupSelected?: Training;
  onSave: () => void;
}

const Form: React.FC<FormProps> = ({ title, userGroupSelected, onSave }) => {
  const isUserGroupSelected = Object.keys(userGroupSelected || {});
  const code = v4();

  const [epiAux, setEpilAux] = useState<Training | undefined>(undefined);

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

  useEffect(() => {
    setEpilAux(undefined);
    setEpilAux(userGroupSelected || undefined);
  }, [userGroupSelected]);

  return (
    <Formik
      initialValues={{
        descricao: '',
        status: 1,
        ...epiAux,
      }}
      enableReinitialize
      onSubmit={values => {
        if (isUserGroupSelected.length) {
          return updateUserGroups({
            ...values,
            cod_grupoUsuarios: userGroupSelected?.cod_grupoUsuarios || '',
            status: Number(values.status) === 1,
          })
            .then(() => {
              swalSuccess('Grupo de Usuários editado com sucesso!');
              onSave();
            })
            .catch(() =>
              swalError(
                'Um erro ocorreu na edição do Grupo de Usuário. Revise as informações e tente novamente',
              ),
            );
        }

        return createUserGroups({
          ...values,
          status: Number(values.status) === 1,
          cod_grupoUsuarios: code,
        })
          .then(() => {
            swalSuccess('Grupo de Usuários criado com sucesso!');
            onSave();
          })
          .catch(() =>
            swalError(
              'Um erro ocorreu na criação do Grupo de Usuários. Revise as informações e tente novamente',
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
          <Title>
            {isUserGroupSelected.length > 0 ? 'Editar Grupo de Usuário' : title}
          </Title>

          <Input
            name="descricao"
            width="100%"
            labelText="DESCRIÇÃO*"
            hasError={
              !!errors.descricao && touched.descricao && !!errors.descricao
            }
            errorMessage={errors.descricao}
            value={values.descricao}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Insira a descrição do Grupo"
          />
          <Input
            width="100%"
            name="cod_grupoUsuarios"
            labelText="Código"
            disabled
            value={code}
          />

          <SelectInput
            options={[
              { label: 'Ativado', id: 1 },
              { label: 'Inativado', id: 0 },
            ]}
            consideredValue="id"
            width="100%"
            name="status"
            labelText="STATUS*"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <ButtonWrapper>
            <Button type="submit" full disabled={isSubmitting}>
              {isUserGroupSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
