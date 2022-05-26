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
  createTraining,
  updateTraining,
} from '../../../../services/trainings.service';

import validations from './validations';

interface Training {
  cod_treinamento: string;
  descricao: string;
  status?: number;
}

interface FormProps {
  title: string;
  trainingSelected?: Training;
  onSave: () => void;
}

const Form: React.FC<FormProps> = ({ title, trainingSelected, onSave }) => {
  const isTrainingSelected = Object.keys(trainingSelected || {});
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
    setEpilAux(trainingSelected || undefined);
  }, [trainingSelected]);

  return (
    <Formik
      initialValues={{
        descricao: '',
        status: 1,
        ...epiAux,
      }}
      enableReinitialize
      onSubmit={values => {
        if (isTrainingSelected.length) {
          return updateTraining({
            ...values,
            cod_treinamento: trainingSelected?.cod_treinamento || '',
            status: Number(values.status) === 1,
          })
            .then(() => {
              swalSuccess('Treinamento editado com sucesso!');
              onSave();
            })
            .catch(message =>
              swalError(
                message.response.data ||
                  'Um erro ocorreu na edição do treinamento. Revise as informações e tente novamente',
              ),
            );
        }

        return createTraining({
          ...values,
          status: Number(values.status) === 1,
          cod_treinamento: code,
        })
          .then(() => {
            swalSuccess('Treinamento criado com sucesso!');
            onSave();
          })
          .catch(message =>
            swalError(
              message.response.data ||
                'Um erro ocorreu na criação do Treinamento. Revise as informações e tente novamente',
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
            {isTrainingSelected.length > 0 ? 'Editar Treinamento' : title}
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
            placeholder="Insira a descrição do Treinamento"
          />
          <Input
            width="100%"
            name="cod_treinamento"
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
              {isTrainingSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
